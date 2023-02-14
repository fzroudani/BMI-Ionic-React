import { IonButton, IonCol, IonIcon, IonRow } from "@ionic/react";
import React from "react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
const BmiControls: React.FC<{
  onCalculate: () => void;
  OnReset: () => void;
}> = (props) => {
  return (
    <IonRow>
      <IonCol className="ion-text-left">
        <IonButton onClick={props.onCalculate}>
          <IonIcon slot="start" icon={calculatorOutline} />
          Calculate
        </IonButton>
      </IonCol>
      <IonCol className="ion-text-right">
        <IonButton onClick={props.OnReset}>
          <IonIcon slot="start" icon={refreshOutline} />
          Reset
        </IonButton>
      </IonCol>
    </IonRow>
  );
};
export default BmiControls;
