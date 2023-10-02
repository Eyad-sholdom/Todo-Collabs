import React, { useState, useRef, useEffect } from "react";
import { Avatar, Box, Tooltip } from "@mui/material";

const MembersLine = ({ members = [] }) => {
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  const handleMouseDown = (e) => {
    setIsDown(true);
    sliderRef.current.style.cursor = "grabbing";
    setStartX(e.clientX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    sliderRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.clientX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 0.5; // Scroll-fast factor
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;

    const eventHandlers = [
      ["mousedown", handleMouseDown],
      ["mouseup", handleMouseUp],
      ["mousemove", handleMouseMove],
      ["mouseleave", handleMouseUp],
      ["touchstart", handleMouseDown],
      ["touchend", handleMouseUp],
      ["touchmove", handleMouseMove],
    ];

    eventHandlers.forEach(([event, handler]) =>
      sliderElement.addEventListener(event, handler)
    );

    return () => {
      eventHandlers.forEach(([event, handler]) =>
        sliderElement.removeEventListener(event, handler)
      );
    };
  }, [startX, scrollLeft, isDown]);

  return (
    <Box
      sx={{
        height: "100%",
        maxWidth: "100%",
        overflowX: "scroll",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
        cursor: "grab",
        "&::-webkit-scrollbar": {
          width: "0.5em",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "transparent",
        },
      }}
      ref={sliderRef}
    >
      <Box
        sx={{
          maxWidth: "35vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          scrollSnapType: "x mandatory",
          gap: 2,
        }}
      >
        {members.map((member, index) => (
          <Box key={index} sx={{ paddingLeft: 2 }}>
            <Tooltip title={member.name.split(" ")[0]}>
              <Avatar
                alt={member.name.split(" ")[0]}
                src={member.photo || ""}
              />
            </Tooltip>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MembersLine;
