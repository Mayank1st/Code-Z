import React, { useEffect } from 'react';

function HomeHeadingSlider() {
  useEffect(() => {
    // Dynamically load the Tiny Slider CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.ayroui.com/1.0/css/tiny-slider.css';
    document.head.appendChild(link);

    // Dynamically load the Tiny Slider JS
    const script = document.createElement('script');
    script.src = 'https://cdn.ayroui.com/1.0/js/tiny-slider.js';
    script.async = true;
    script.onload = () => {
      // Initialize Tiny Slider after it's loaded
      if (window.tns) {
        window.tns({
          autoplay: true,
          autoplayButtonOutput: false,
          mouseDrag: true,
          gutter: 0,
          container: '.slider-items-active',
          center: false,
          nav: true,
          navPosition: 'bottom',
          controls: false,
          speed: 400,
          responsive: {
            0: {
              items: 1,
            },
            768: {
              items: 2,
            },
            992: {
              items: 3,
            },
          },
        });
      }
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script and link when the component unmounts
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* SLIDER THREE PART START */}
      <section className="slider-three">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center">
                <h3 className="title">Unlock Your Coding Potential</h3>
                {/* <p className="text">
                  Stop wasting time and money designing and managing a website
                  that doesn’t get results. Happiness guaranteed!
                </p> */}
              </div>
              {/* section title */}
            </div>
          </div>
          {/* row */}

          <div className="slider-items-wrapper">
            <div className="row slider-items-active">
              <div className="col-lg-4">
                <div className="single-items-one">
                  <img
                    src="https://www.shutterstock.com/shutterstock/videos/1104294267/thumb/9.jpg?ip=x480"
                    alt="Image"
                  />
                </div>
                {/* single-items-one */}
              </div>
              <div className="col-lg-4">
                <div className="single-items-one">
                  <img
                    src="https://www.shutterstock.com/shutterstock/videos/1096587261/thumb/1.jpg?ip=x480"
                    alt="Image"
                  />
                </div>
                {/* single-items-one */}
              </div>
              <div className="col-lg-4">
                <div className="single-items-one">
                  <img
                    src="https://www.shutterstock.com/shutterstock/videos/17078563/thumb/10.jpg?ip=x480"
                    alt="Image"
                  />
                </div>
                {/* single-items-one */}
              </div>
              <div className="col-lg-4">
                <div className="single-items-one">
                  <img
                    src="https://www.shutterstock.com/shutterstock/videos/1096904189/thumb/4.jpg?ip=x480"
                    alt="Image"
                  />
                </div>
                {/* single-items-one */}
              </div>
            </div>
            {/* row */}
          </div>
        </div>
        {/* container */}
      </section>
      {/* SLIDER THREE PART ENDS */}
    </div>
  );
}

export default HomeHeadingSlider;
