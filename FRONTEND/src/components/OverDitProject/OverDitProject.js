import "./OverDitProject.scss";
import { useDispatch } from "react-redux";
import { setOverDitProjectFalse } from "../../slices/menuSlice";
import { X } from "react-feather";

function OverDitProject() {
  const dispatch = useDispatch();

  return (
    <div className="OverDitProject">
      <div className="OverDitProjectDiv">
        <button onClick={() => dispatch(setOverDitProjectFalse())}>
          <X size={30} />
        </button>
        <h2>Over dit project</h2>
        <p>
          Online privacy is een onderwerp dat steeds belangrijker wordt. <br />
          Een foto op sociale media plaatsen of je sportprestatie op Strava
          delen, het lijken allemaal zeer onschuldige handelingen.
          <br /> <br /> Maar moet iedereen weten waar je woont? En zijn de
          foto’s die je op Instagram plaatst enkel voor je vrienden? We zijn er
          ons nog altijd niet genoeg van bewust hoeveel en welke informatie we
          allemaal achterlaten op diverse online platformen. Een veel gehoorde
          reactie is dan ook: “ze mogen alles weten, ik heb toch niks te
          verbergen”. Ik ben er van overtuigd dat iedereen wel iets te verbergen
          heeft of toch op zijn minst niet graag heeft wanneer onbekenden plots
          net iets te veel over jou te weten komen.
          <br /> <br /> Dat laatste is dan ook precies wat ik met mijn Finalwork
          wil beogen: de gebruiker van schaamteloos.online zich oncomfortabel
          laten voelen door hun eigen persoonlijke data zichtbaar te maken, met
          als uiteindelijke doel dat de gebruiker bewuster en zorgzamer
          omspringt met het online “delen” van persoonlijke data.
        </p>
      </div>
    </div>
  );
}

export default OverDitProject;
