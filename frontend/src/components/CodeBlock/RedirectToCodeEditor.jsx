import React, { useState, useEffect } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

function RedirectToCodeEditor() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "/user/room/create",
        {},
        // { withCredentials: true }
      );

      console.log(response);
      const { room_id, creator_email } = response.data.room;

      navigate(`/code-editor?roomId=${room_id}&creatorEmail=${creator_email}`);
    } catch (error) {
      console.error("Error creating room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        colorScheme="teal"
        size="md"
        onClick={handleRedirect}
        isLoading={isLoading}
        _hover={{ bg: "teal.500", color: "white" }}
        spinner={<Spinner size="sm" />}
      >
        Redirect to code editor
      </Button>
    </div>
  );
}

export default RedirectToCodeEditor;
