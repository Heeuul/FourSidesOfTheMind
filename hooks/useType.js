import { createContext, useContext, useMemo, useState } from "react";

const TypeContext = createContext({});
export const TypeProvider = ({ children }) => {
  /*prettier-ignore*/ const [energy,   SetEnergy]   = useState(true); // E:true, I:false
  /*prettier-ignore*/ const [perceive, SetPerceive] = useState(true); // S:true, N:false
  /*prettier-ignore*/ const [judge,    SetJudge]    = useState(true); // T:true, F:false
  /*prettier-ignore*/ const [process,  SetProcess]  = useState(true); // P:true, J:false

  /*prettier-ignore*/ function GetEnergy(energy)     { return energy ? "E" : "I";   }
  /*prettier-ignore*/ function GetPerceive(perceive) { return perceive ? "S" : "N"; }
  /*prettier-ignore*/ function GetJudge(judge)       { return judge ? "T" : "F";    }
  /*prettier-ignore*/ function GetProcess(process)   { return process ? "P" : "J";  }

  function GetType(side) {
    switch (side) {
      // prettier-ignore
      case "Ego"        : return (GetEnergy(energy) + GetPerceive(perceive) + GetJudge(judge) + GetProcess(process));
      // prettier-ignore
      case "Subconcious": return (GetEnergy(!energy) + GetPerceive(!perceive) + GetJudge(!judge) + GetProcess(!process));
      // prettier-ignore
      case "Unconcious" : return (GetEnergy(!energy) + GetPerceive(perceive) + GetJudge(judge) + GetProcess(!process));
      // prettier-ignore
      case "Superego"   : return (GetEnergy(energy) + GetPerceive(!perceive) + GetJudge(!judge) + GetProcess(process));
    }
  }
  function GetLabel(side) {
    switch (side) {
      // prettier-ignore
      case "Ego"        : return ["Hero", "Parent", "Child", "Inferior"];
      // prettier-ignore
      case "Subconcious": return ["Hero", "Parent", "Child", "Inferior"];
      // prettier-ignore
      case "Unconcious" : return ["Nemesis", "Critic", "Trickster", "Demon"];
      // prettier-ignore
      case "Superego"   : return ["Nemesis", "Critic", "Trickster", "Demon"];
    }
  }

  const axisFunction = { S: "N", N: "S", T: "F", F: "T" };
  function GetFunctionStack(type) {
    let func = [type[1], type[2]];

    func[0] += type[3] === "P" ? "e" : "i";
    func[1] += type[3] === "J" ? "e" : "i";

    if (type[0].toLowerCase() != func[0][1])
      [func[0], func[1]] = [func[1], func[0]];

    func[2] = axisFunction[func[1][0]] + (func[1][1] === "e" ? "i" : "e");
    func[3] = axisFunction[func[0][0]] + (func[0][1] === "i" ? "e" : "i");

    return func;
  }

  function GetFunctionName(func) {
    return (
      (func[1] === "e" ? "Extraverted" : "Introverted") +
      " " +
      (func[0] === "S"
        ? "sensing"
        : func[0] === "N"
        ? "intuition"
        : func[0] === "T"
        ? "thinking"
        : "feeling")
    );
  }

  const typeMemo = useMemo(
    () => ({
      FlipEnergy: () => SetEnergy(!energy),
      FlipPerceive: () => SetPerceive(!perceive),
      FlipJudge: () => SetJudge(!judge),
      FlipProcess: () => SetProcess(!process),
      GetType,
      GetLabel,
      GetFunctionStack,
      GetFunctionName,
    }),
    [energy, perceive, judge, process]
  );

  return (
    <TypeContext.Provider value={typeMemo}>{children}</TypeContext.Provider>
  );
};

export default function useType() {
  return useContext(TypeContext);
}

//prettier-ignore
const types = [
  "ESTJ","ESTP","ENTJ","ENFJ",
  "ESFJ","ESFP","ENTP","ENFP",
  "ISTJ","ISTP","INTJ","INFJ",
  "ISFJ","ISFP","INTP","INFP",
];
