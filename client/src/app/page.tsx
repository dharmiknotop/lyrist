import Form from "../components/Form";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[100vh] flex-col">
      <h1 className="text-5xl lg:text-7xl text-cyan-400">lyrist</h1>
      <h1 className="text-base lg:text-lg text-gray-400 text-center mt-3">
        A simple easy to use app for getting the lyrcis from your favorite
        singer
      </h1>

      <Form />
    </div>
  );
}
