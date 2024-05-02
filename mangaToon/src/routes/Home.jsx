import PopularesHoje from "../components/PopularesHoje";
import UltimaAtualizacao from "../components/UltimaAtualizacao";
import "./Home.css"

const Home = () => {
  return (
    <>
      <div className="container-home">
        <PopularesHoje />
        <UltimaAtualizacao />
      </div>
    </>
  );
};

export default Home;
