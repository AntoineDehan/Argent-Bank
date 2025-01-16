import "../../styles/css/home/style.css"
import bgimg from "../../assets/images/bank-tree.webp"
import iconchat from "../../assets/images/icon-chat.webp"
import iconmoney from "../../assets/images/icon-money.webp"
import iconsecurity from "../../assets/images/icon-security.webp"

function Home() {
  return (
    <div className="home-conteneur">
      <div className="banner-conteneur">
        <div className="banner-text">
          <h1>
            No fees.
            <br />
            No minimum desposit.
            <br />
            Hight interest rates.
          </h1>
          <p>Open a savings account with Argent bank today!</p>
        </div>
      </div>
      <div className="features">
        <div className="feature-item">
          <img
            src={iconchat}
            alt="Icone de bulles de textes de chat"
            className="feature-icon"
          />
          <h3 className="feature-item-title">You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className="feature-item">
          <img
            src={iconmoney}
            alt="Icone de billets d'argents"
            className="feature-icon"
          />
          <h3 className="feature-item-title">
            More savings means higher rates
          </h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        <div className="feature-item">
          <img
            src={iconsecurity}
            alt="Icone de bouclier de sécurité"
            className="feature-icon"
          />
          <h3 className="feature-item-title">Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
