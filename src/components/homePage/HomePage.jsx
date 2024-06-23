import Banner from "./Banner";
import Card from "./Card";

const HomePage = ({isAuthenticated}) => {
    const bannerText = !!isAuthenticated ? "You are already logged in!" : "You have to log in!";
    const cardText1 = "This is card 1";
    const cardText2 = "This is card 2";
    const cardText3 = "This is card 3";


    return (
      <div className="home-container">
          <Banner bannerText={bannerText}></Banner>
          <div className="cards">
              <Card cardText={cardText1}></Card>
              <Card cardText={cardText2}></Card>
              <Card cardText={cardText3}></Card>
          </div>

      </div>
    );
}

export default HomePage;