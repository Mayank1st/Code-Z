import { useRef, useState, useEffect, useMemo } from "react";
import {
  Box,
  HStack,
  IconButton,
  ButtonGroup,
  VStack,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  Textarea,
  Spinner,
  Input,
  useToast,
  Button, // Import useToast
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../../utils/constants";
import Output from "./Output";
import {
  FaRobot,
  FaShareAlt,
  FaDownload,
  FaCog,
  FaPaperPlane,
  FaUserPlus,
} from "react-icons/fa";
import "../../styles/CodeEditor.css";
import axios from "axios";
import { marked } from "marked";
import { jsPDF } from "jspdf";
import { Formik, Form, Field } from "formik";
import { io } from "socket.io-client";
import { FaCopy } from "react-icons/fa";
import { useClipboard } from "@chakra-ui/react";
const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isSaving, setIsSaving] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [editorWidth, setEditorWidth] = useState(50);
  const [suggestion, setSuggestion] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [popoverHeight, setPopoverHeight] = useState("auto");
  const [shareCodeLink, setShareCodeLink] = useState("");
  const { onCopy } = useClipboard(shareCodeLink);
  const [inviting, setInviting] = useState(false);
  const toast = useToast();

  // Get roomId and creatorEmail from URL params
  const params = new URLSearchParams(window.location.search);

  const roomId = params.get("roomId");

  // Creator's param data
  const creatorEmail = params.get("creatorEmail");

  // Participent's param data
  const participentEmail = params.get("participentEmail");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const toggleAI = () => {
    setAiEnabled(!aiEnabled);
  };

  // const fetchAiSuggestion = async (input) => {
  //   if (!aiEnabled || input.trim() === "") return;

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/user/generate-content",
  //       {
  //         prompt: input,
  //       }
  //     );
  //     const suggestionData = response.data;
  //     setSuggestion(suggestionData);
  //   } catch (error) {
  //     console.error("Error fetching AI suggestion:", error);
  //   }
  // };

  // const handleTextChange = (newValue) => {
  //   setValue(newValue);

  //   if (aiEnabled) {
  //     const lastLine = newValue.split("\n").pop();
  //     fetchAiSuggestion(lastLine);
  //   }
  // };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && suggestion) {
      event.preventDefault();
      const newValue = value + suggestion;
      setValue(newValue);
      setSuggestion("");
    }
  };

  const handleShareCodeLink = () => {
    setShareCodeLink(
      `http://localhost:3000/join-code-editor-room?roomId=${roomId}&participentEmail=${participentEmail}`
    );
  };

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/generate-content",
        {
          prompt: userMessage,
        }
      );

      const parsedResponse = marked(response.data.text || "");
      setAiResponse(parsedResponse);
      setUserMessage("");
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (values, { setSubmitting }) => {
    setInviting(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/room/${roomId}/invite`,
        {
          invitees: [values.email],
        },
        { withCredentials: true }
      );

      toast({
        title: "Invitation sent.",
        description: "The invite has been sent successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error.",
        description:
          error.response?.data?.message || "Failed to send invitation.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
      setInviting(false);
    }
  };

  // Socket Connection
  const socket = useMemo(() => io("http://localhost:8000"), []);

  useEffect(() => {
    try {
      if (creatorEmail) {
        const message = `creator connected with email: ${creatorEmail}`;
        socket.emit("creator_connection", message);
      } else if (participentEmail) {
        const message = `participent connected with email: ${participentEmail}`;
        socket.emit("participent_connection", message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Function to join a room
    const joinRoom = (roomId) => {
      if (creatorEmail || participentEmail) {
        const roomDetails = {
          roomId,
          userEmail: creatorEmail || participentEmail,
        };
        socket.emit("join-room", roomDetails);
      }
    };

    // Listening for saved code from other users
    socket.on("codeSaved", ({ code, userEmail }) => {
      console.log("My test:", code);
      if (userEmail !== (creatorEmail || participentEmail)) {
        setValue(code);

        // Show toast notification for the code update
        toast({
          title: "Code Updated",
          description: "You got an updated code.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    });

    // Listening for code updates from other participants
    socket.on("receiveCodeUpdate", (codeDetails) => {
      if (codeDetails.userEmail !== (creatorEmail || participentEmail)) {
        setValue(codeDetails.code); 
      }
    });

    // Handling code updation

    // Join room if `roomId` is provided
    if (roomId) {
      joinRoom(roomId);
    }

    // Function to join a room
    const leaveRoom = (roomId) => {
      if (creatorEmail || participentEmail) {
        const roomDetails = {
          roomId,
          userEmail: creatorEmail || participentEmail,
        };
        socket.emit("leave-room", roomDetails);
      }
    };

    // Listen for room messages
    const handleRoomMessages = (message) => {
      console.log(message);
    };
    socket.on("roomNotificationMessages", handleRoomMessages);

    // Cleanup function
    return () => {
      // Leave room when component unmounts
      if (roomId) {
        leaveRoom(roomId);
      }
      // Cleanup the socket event listener
      socket.off("roomNotificationMessages", handleRoomMessages);
      socket.off("receiveCodeUpdate");
      socket.off("codeSaved");

      // Disconnect socket when component unmounts
      socket.disconnect();
    };
  }, [socket, creatorEmail, participentEmail, roomId, toast]);

  // Function to handle code change
  const handleCodeChange = (newValue) => {
    setValue(newValue);
    if (creatorEmail || participentEmail) {
      const codeDetails = {
        roomId,
        code: newValue,
        userEmail: creatorEmail || participentEmail,
      };

      // console.log("My code details : ", codeDetails);
      socket.emit("codeUpdate", codeDetails);
    }
  };

  useEffect(() => {
    if (aiResponse) {
      const popoverContent = document.querySelector(".popover-content");
      if (popoverContent) {
        const height = popoverContent.scrollHeight;
        setPopoverHeight(`${height}px`);
      }
    }
  }, [aiResponse]);

  const handleSave = async () => {
    setIsSaving(true);
    console.log(value);
    socket.emit("saveCode", {
      roomId,
      code: value,
      userEmail: creatorEmail || participentEmail,
    });
    setIsSaving(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.setFont("Courier", "normal");
    const codeLines = value.split("\n");
    codeLines.forEach((line, index) => {
      doc.text(line, 10, 10 + index * 10);
    });
    doc.save("code-only.pdf");
  };

  return (
    <Box width="full" p={4} overflow="hidden">
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between" width="full">
          <LanguageSelector
            language={language}
            onSelect={onSelect}
            onSave={handleSave}
            isSaving={isSaving}
            code={value}
          />
          <ButtonGroup spacing={4}>
            <Tooltip label="Toggle AI" aria-label="Toggle AI">
              <Popover
                isOpen={aiEnabled}
                onClose={() => setAiEnabled(false)}
                isLazy
              >
                <PopoverTrigger>
                  <IconButton
                    aria-label="Toggle AI"
                    icon={<FaRobot />}
                    onClick={toggleAI}
                    colorScheme={aiEnabled ? "green" : "gray"}
                  />
                </PopoverTrigger>
                <PopoverContent
                  className="popover-content"
                  style={{ height: popoverHeight, width: "400px" }}
                  maxHeight="80vh"
                  overflowY="auto"
                >
                  <PopoverHeader fontWeight="semibold">
                    Chat with AI
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody
                    display="flex"
                    flexDirection="column"
                    height="100%"
                  >
                    <Box mb={4} overflowY="auto" flexGrow={1}>
                      <strong>Response:</strong>
                      <div dangerouslySetInnerHTML={{ __html: aiResponse }} />
                    </Box>
                    <Textarea
                      placeholder="Type your message here..."
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      variant="outline"
                      mb={2}
                    />
                    <IconButton
                      aria-label="Send Message"
                      icon={loading ? <Spinner size="sm" /> : <FaPaperPlane />}
                      onClick={handleSendMessage}
                      colorScheme="green"
                      isDisabled={loading}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Tooltip>

            <Tooltip label="Share Code" aria-label="Share Code">
              <Popover>
                <PopoverTrigger>
                  <IconButton
                    aria-label="Share Code"
                    icon={<FaShareAlt />}
                    onClick={handleShareCodeLink}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Generate Shareable Link</PopoverHeader>
                  <PopoverBody>
                    <Formik
                      initialValues={{ email: "" }}
                      onSubmit={(values, { setSubmitting }) => {
                        setShareCodeLink(
                          `http://localhost:3000/join-code-editor-room?roomId=${roomId}&participentEmail=${values.email}`
                        );
                        toast({
                          title: "Link Generated",
                          description: "Shareable link generated with email.",
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                        });
                        setSubmitting(false);
                      }}
                    >
                      {({ isSubmitting, values }) => (
                        <Form>
                          <Field name="email">
                            {({ field }) => (
                              <Input
                                {...field}
                                placeholder="Enter participant's email"
                                mb={3}
                                isRequired
                              />
                            )}
                          </Field>
                          <HStack>
                            <Button
                              colorScheme="blue"
                              type="submit"
                              isLoading={isSubmitting}
                              loadingText="Generating..."
                            >
                              Generate Link
                            </Button>
                          </HStack>
                        </Form>
                      )}
                    </Formik>
                    <HStack mt={4}>
                      <Input
                        value={shareCodeLink}
                        isReadOnly
                        placeholder="Generate shareable link"
                        size="sm"
                      />
                      <IconButton
                        aria-label="Copy link"
                        icon={<FaCopy />}
                        onClick={() => {
                          onCopy();
                          toast({
                            title: "Link Copied",
                            description: "The shareable link has been copied.",
                            status: "info",
                            duration: 2000,
                            isClosable: true,
                          });
                        }}
                        colorScheme="blue"
                        size="sm"
                        isDisabled={!shareCodeLink} // Disable copy if no link generated
                      />
                    </HStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Tooltip>

            <Tooltip label="Download File" aria-label="Download File">
              <IconButton
                aria-label="Download File"
                icon={<FaDownload />}
                onClick={downloadPDF}
              />
            </Tooltip>
            <Tooltip
              label="Connect Collaborator"
              aria-label="Connect Collaborator"
            >
              <Popover>
                <PopoverTrigger>
                  <IconButton
                    aria-label="Connect Collaborator"
                    icon={<FaUserPlus />}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>Invite Collaborator</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Formik
                      initialValues={{ email: "" }}
                      onSubmit={handleInvite}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <Field name="email">
                            {({ field }) => (
                              <Input
                                {...field}
                                placeholder="Enter collaborator's email"
                                mb={3}
                              />
                            )}
                          </Field>
                          <Button
                            colorScheme="blue"
                            type="submit"
                            isLoading={inviting || isSubmitting}
                            loadingText="Inviting..."
                          >
                            Send Invite
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Tooltip>
            <Tooltip label="Settings" aria-label="Settings">
              <IconButton
                aria-label="Settings"
                icon={<FaCog />}
                onClick={() => alert("Settings functionality goes here")}
              />
            </Tooltip>
          </ButtonGroup>
        </HStack>

        <HStack spacing={0} alignItems="stretch" width="full" overflow="hidden">
          <Box
            width={`${editorWidth}vw`}
            p={3}
            borderWidth="1px"
            borderRadius="md"
          >
            <Editor
              className="code-ide"
              options={{
                minimap: {
                  enabled: false,
                },
                scrollbar: {
                  horizontal: "hidden",
                },
              }}
              height="85vh"
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={handleCodeChange}
              // onChange={handleTextChange}
              onKeyDown={handleKeyDown}
            />
          </Box>

          <Box width="1px" bg="gray.300" />

          <Box
            px={4}
            width={`${100 - editorWidth}vw`}
            borderWidth="1px"
            borderRadius="md"
          >
            <Output editorRef={editorRef} language={language} />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CodeEditor;
