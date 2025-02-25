"use client";

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://upload.wikimedia.org/wikipedia/commons/4/43/ESO-VLT-Laser-phot-33a-07.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Explore the Stars</h1>
          <p className="mb-5">
            Welcome to AstroFetch. A simple yet effective tool to easily view
            the Astronomy Picture of the Day (APOD).
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
