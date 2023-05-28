export default function Border({ size }: { size: number }) {
  return (
    <div
      className="bg-gray-700"
      style={{
        flex: "none",
        height: size,
      }}
    />
  );
}
