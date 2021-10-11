import { useContext } from "react";
import { UserContext } from "../../context";
import { addNewCharacterForUser } from "../Firebase/firebase.utils";

const SaveCharacter = (props) => {
    const {user} = useContext(UserContext);

    const selectedAdvantagesList = props.selectedAdvantagesList;
    const selectedDisadvantagesList = props.selectedDisadvantagesList;
    const characterName = props.characterName;

    
    const saveCharacterHandler = async () => {
        if ((selectedAdvantagesList.length > 0 || selectedDisadvantagesList.length > 0) & (characterName !== "")) {
            console.log("****saveCharacterHandler Called");
            console.log("****selectedAdvantagesList: ", selectedAdvantagesList);
            console.log("****selectedDisadvantagesList: ", selectedDisadvantagesList);
            console.log(`****${characterName} has been saved`);

            let newCharacter;
            newCharacter = {
                name: characterName,
                advantages: selectedAdvantagesList.map(({ title }) => title),
                disadvantages: selectedDisadvantagesList.map(({ title }) => title)
            };
    
            const currentlyLoggedInUserId = user.uid;
            console.log("**** New Character for " + currentlyLoggedInUserId + " is ", newCharacter);
            const newCharacterRef = await addNewCharacterForUser(currentlyLoggedInUserId, newCharacter);
            console.log("**** newCharacterRef: ", newCharacterRef);
            window.location.reload();
        } else if (characterName !== '') {
            console.log('save fail');            
            alert('You must select at least one Advantage or Disadvantage')
        } else {
            console.log('save fail');
            alert('You must select a name for your character in order to save')
        }  
    };

    return (
        <div className="button-container">
            <button className="tool-button" onClick={saveCharacterHandler}>Save Character</button>
        </div>
    );
}

export default SaveCharacter;

