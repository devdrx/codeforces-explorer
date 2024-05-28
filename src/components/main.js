import SearchBar from "./Searchbar";
import TabSubmissions from "./TabSubmissions";
import { useAuth } from "../Auth/AuthContext";
import Duck from "../images/duck.png";
import PixelFlower from "../images/pixelFlower.png";
import Settings from "./Settings";
import GithubCard from "./GithubCard";
import Solutions from "./Solutions";
import VisitorCounter from "./Visit";
import { Link } from "@radix-ui/themes";
import HowToUse from "./HowToUse";
import ProbChart from "./probChart";

export default function Main({ setTheme }) {
  const authContext = useAuth();

  // useEffect(() => {
  //   authContext.getUserInfo(["hitvrth", "hitxrth"]);
  // }, []);

  return (
    <div className="">
      <div className="flex flex-row justify-between px-4 md:px- items-center font-sans ">
        {/* <Settings setTheme={setTheme} /> */}
        <GithubCard />
        <SearchBar />
        <Settings setTheme={setTheme} />
      </div>
      {authContext.errorMessage && authContext.errorMessage.length > 0 && (
        <div className="flex flex-col justify-center items-center transition-opacity duration-1000">
          {authContext.errorMessage}{" "}
          <img className="size-10" src={Duck} alt="" />
        </div>
      )}
      {authContext.errorMessage.length === 0 &&
        authContext.questionsSolved.length === 0 &&
        authContext.solutions.length === 0 &&
        !authContext.loading && (
          <div
          className="flex text-lg justify-center items-center gap-4"
          style={{ fontFamily: "Pixelify Sans", height: "80vh" }}
          >
            <div
              className="flex text-lg justify-center items-center gap-4"
              style={{ fontFamily: "Pixelify Sans", 
                margin: "auto",
              }}
            >
              CodeForces
              <img className="w-auto h-14" src={PixelFlower} alt=""></img>{" "}
              Explorer
            </div>

            <div className="text-xs">
              <HowToUse />
            </div>
          </div>
        )}

      <div
        className={`md:mx-28 sm:mx-4 transition-all ease-in-out duration-500 ${
          authContext.loading ? "blur-sm opacity-25" : ""
        }`}
      >
        {authContext.questionsSolved.length > 0 ? <TabSubmissions /> : ""}
        {authContext.solutions.length > 0 ? <Solutions /> : ""}
        <div className="flex opacity-0 text-[12px] gap-2 justify-center items-center">
          <VisitorCounter />
        </div>
      </div>

        <div className="flex flex-col justify-center items-center">
          <ProbChart/>
        </div>
    </div>
  );
}
