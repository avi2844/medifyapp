import HeroSection from "../HeroSection/HeroSection";
import NavBar from "../NavBar/NavBar";
import SearchSection from "../SearchSection/SearchSection";

function Home(){
    return (
        <div>
            <NavBar />
            <HeroSection />
            <SearchSection />
        </div>
        
    )
}

export default Home;