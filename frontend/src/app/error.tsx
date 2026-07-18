"use client";

const Error = ({ error, reset }:
  {
    error: Error & { digest?: string }
    reset: () => void
  }) =>
  <div>
    <h2>Something went wrong</h2>
    <p>Are the database and the API online</p>
    <button onClick={() => reset()}>Try Again</button>
  </div>

export default Error;
