"use client";

import Button from "@/components/Button";
import Container from "@/components/Container";

function Home() {
  const a = () => {
    console.log("here");
  };
  return (
    <Container>
      <div>
        <h1 className="font-bold text-3xl text-center">AstroFetch</h1>
      </div>
    </Container>
  );
}

export default Home;
