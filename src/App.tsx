import {
  IonApp,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  setupIonicReact,
  IonAlert,
} from "@ionic/react";

import { IonHeader, IonContent, IonToolbar, IonTitle } from "@ionic/react";
import BmiControls from "./components/BmiControls";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useRef, useState } from "react";
import BmiResults from "./components/BmiResult";
import InputControl from "./components/InputControl";
setupIonicReact();

const App: React.FC = () => {
  const weightInoutRef = useRef<HTMLIonInputElement>(null);
  const heightInoutRef = useRef<HTMLIonInputElement>(null);
  const [calculatedBMI, setCalculatedBMI] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [units, setUnits] = useState<"mkg" | "ftlbs">("mkg");

  const calculateBMI = () => {
    const weight = weightInoutRef.current!.value;
    const height = heightInoutRef.current!.value;
    if (!height || !weight || +height <= 0 || +weight <= 0) {
      setError("Please enter a valide (non-negative) input number");
      return;
    }

    const weightConversionFactor = units === "ftlbs" ? 2.2 : 1;

    const weightConverted = +weight * weightConversionFactor;
    console.log("hdra" + weightConverted);
    const heightConversionFactor = units === "ftlbs" ? 3.28 : 1;
    const heightConverted = +height * heightConversionFactor;
    console.log("hdra" + heightConverted);

    const bmi = weightConverted / (heightConverted * heightConverted);
    setCalculatedBMI(bmi);
  };
  const resetInputs = () => {
    weightInoutRef.current!.value = "";
    heightInoutRef.current!.value = "";
    setCalculatedBMI(0);
  };
  const clearError = () => {
    setError("");
  };
  const selectUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setUnits(selectedValue);
  };
  return (
    <IonApp>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "Ok", handler: clearError }]}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl
                selectedValue={units}
                onSelectValue={selectUnitHandler}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Height ({units === "mkg" ? "meters" : "feet"}){" "}
                </IonLabel>
                <IonInput type="number" ref={heightInoutRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Weight ({units === "mkg" ? "kg" : "lbs"})
                </IonLabel>
                <IonInput type="number" ref={weightInoutRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} OnReset={resetInputs} />
          {calculatedBMI !== 0 && <BmiResults result={calculatedBMI} />}
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

export default App;
