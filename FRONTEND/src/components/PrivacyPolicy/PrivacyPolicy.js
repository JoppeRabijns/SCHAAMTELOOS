import "./PrivacyPolicy.scss";
import { useDispatch } from "react-redux";
import { setPrivacyPolicyFalse } from "../../slices/menuSlice";
import { X } from "react-feather";

function PrivacyPolicy() {
  const dispatch = useDispatch();

  return (
    <div className="PrivacyPolicy">
      <button onClick={() => dispatch(setPrivacyPolicyFalse())}>
        <X size={30} />
      </button>
      <h2>Privacy Policy</h2>
      <p>
        SCHAAMTELOOS.ONLINE is een webplatform dat de bezoeker op een
        diverterende en interactieve manier bewust moet maken van het veilig en
        zorgzaam omspringen met persoonlijke data op het internet.
        <br />
        <br /> De gebruiker zal zich op de website moeten registeren aan de hand
        van een ‘login met Facebook’-button. Vervolgens zal aan de hand van de
        Facebook- gegevens nog meer data van de website-bezoeker gezocht worden.
        De techniek die hiervoor gebruikt wordt, is geauto-matiseerde
        webscraping.
        <br />
        <br />
        Terwijl de webscraping loopt in de achtergrond, zal de gebruiker via een
        laad-scherm al een eerste keer geconfronteerd worden met
        gecompromitteerde data afkomstig van datalekken. Ik gebruik hiervoor de
        webservice “haveibeenpwned. com”. Zodra de webscraping voltooid is,
        start er een gepersonaliseerde video waarin alle gevonden data verwerkt
        zit.
        <br />
        <br /> Het scenario van de video is dat er tijdens een straatinterview
        aan voorbijgangers wordt gevraagd of ze zelf bezig zijn met online
        privacy en wat ze vinden van de getoonde data op een pancarte. De clou
        is dat we de indruk geven dat de pancarte data bevat van een
        willekeurige persoon, maar dat we in werkelijkheid de data van de
        ingelogde website-bezoeker tonen.
        <br />
        <br />
        De reporter zal vragen aan de geinter-viewde om het gsm-nummer te bellen
        dat op de pancarte weergegeven wordt. De twist hier zal zijn dat de gsm
        van de website-bezoeker rinkelt. De video pauzeert tijdens het rinkelen.
        Zodra de gsm opgenomen wordt, zal de video verder afspelen. De audio van
        de video zal vanaf dan te horen zijn via de gsm en niet meer via de
        speakers van de computer.
        <br />
        <br /> Op einde van de video krijgt de bezoeker de pancarte met al
        zijn/haar data voor een laatste keer te zien. Ook is er de mogelijkheid
        om de website SCHAAMTELOOS.ONLINE via verschillende sociale media
        platformen te delen.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
