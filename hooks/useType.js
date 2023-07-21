import { createContext, useContext, useMemo, useState } from "react";

const TypeContext = createContext({});
export const TypeProvider = ({ children }) => {
  /*prettier-ignore*/ const [energy,     SetEnergy    ] = useState(true); // E:true, I:false
  /*prettier-ignore*/ const [perceive,   SetPerceive  ] = useState(true); // S:true, N:false
  /*prettier-ignore*/ const [judge,      SetJudge     ] = useState(true); // T:true, F:false
  /*prettier-ignore*/ const [preference, SetPreference] = useState(true); // P:true, J:false

  /*prettier-ignore*/ function GetEnergy(energy)         { return energy     ? "E" : "I"; }
  /*prettier-ignore*/ function GetPerceive(perceive)     { return perceive   ? "S" : "N"; }
  /*prettier-ignore*/ function GetJudge(judge)           { return judge      ? "T" : "F"; }
  /*prettier-ignore*/ function GetPreference(preference) { return preference ? "P" : "J"; }

  function GetType(side) {
    switch (side) {
      // prettier-ignore
      case "Ego"        : return (GetEnergy(energy) + GetPerceive(perceive) + GetJudge(judge) + GetPreference(preference));
      // prettier-ignore
      case "Subconcious": return (GetEnergy(!energy) + GetPerceive(!perceive) + GetJudge(!judge) + GetPreference(!preference));
      // prettier-ignore
      case "Unconcious" : return (GetEnergy(!energy) + GetPerceive(perceive) + GetJudge(judge) + GetPreference(!preference));
      // prettier-ignore
      case "Superego"   : return (GetEnergy(energy) + GetPerceive(!perceive) + GetJudge(!judge) + GetPreference(preference));
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

  function GetQuadra(type) {
    const quadra = type.substring(1, 4);

    if (quadra === "STP" || quadra === "NFJ") return "Templar";
    if (quadra === "STJ" || quadra === "NFP") return "Philosopher";
    if (quadra === "SFJ" || quadra === "NTP") return "Crusader";
    if (quadra === "SFP" || quadra === "NTJ") return "Wayfarer";
  }

  function GetExpressionFull(type) {
    const expression = GetExpression(type);
    return {
      expression: expression,
      communication: GetCommunication(expression),
      role: GetRole(expression),
      goalFocus: GetGoalFocus(expression),
    };
  }
  function GetExpression(type) {
    const exp1 = type.substring(0, 3);
    const exp2 = type.slice(0, 2) + type.slice(3);

    if (exp1 === "EST" || exp2 === "ENJ") return "Structure";
    if (exp1 === "ESF" || exp2 === "ENP") return "Starter";
    if (exp1 === "IST" || exp2 === "INJ") return "Finisher";
    if (exp1 === "ISF" || exp2 === "INP") return "Background";
  }
  function GetCommunication(type) {
    const exp = type.length === 4 ? GetExpression(type) : type;

    if (exp === "Structure" || exp === "Finisher") return "Direct";
    if (exp === "Starter" || exp === "Background") return "Informative";
  }
  function GetRole(type) {
    if (type.length === 4) return type[0] === "E" ? "Initiating" : "Responding";

    if (type === "Structure" || type === "Starter") return "Initiating";
    if (type === "Finisher" || type === "Background") return "Responding";
  }
  function GetGoalFocus(type) {
    const exp = type.length === 4 ? GetExpression(type) : type;

    if (exp === "Structure" || exp === "Background") return "Outcome";
    if (exp === "Starter" || exp === "Finisher") return "Progression";
  }

  function GetWorldviewFull(type) {
    const worldview = GetWorldview(type);

    return {
      worldview: worldview,
      tangibility: GetTangibility(worldview),
      value: GetValue(worldview),
      process: GetProcess(worldview),
    };
  }
  function GetWorldview(type) {
    const wv1 = type[1] + type[3];
    const wv2 = type.substring(1, 3);

    if (wv1 === "SJ") return "Guardian";
    if (wv1 === "SP") return "Artisan";
    if (wv2 === "NT") return "Intellectual";
    if (wv2 === "NF") return "Idealist";
  }
  function GetTangibility(type) {
    const wv = type.length === 4 ? GetWorldview(type) : type;

    if (wv === "Guardian" || wv === "Artisan") return "Concrete";
    if (wv === "Intellectual" || wv === "Idealist") return "Abstract";
  }
  function GetValue(type) {
    const wv = type.length === 4 ? GetWorldview(type) : type;

    if (wv === "Artisan" || wv === "Intellectual") return "Pragmatic";
    if (wv === "Guardian" || wv === "Idealist") return "Affliative";
  }
  function GetProcess(type) {
    const wv = type.length === 4 ? GetWorldview(type) : type;

    if (wv === "Guardian" || wv === "Intellectual") return "Systematic";
    if (wv === "Artisan" || wv === "Idealist") return "Interest";
  }

  function GetArmament(type) {
    return { arsenal: GetArsenal(type), affinity: GetAffinity(type) };
  }
  function GetArsenal(type) {
    const arsenal = type.substring(2, 4);

    if (arsenal === "TP" || arsenal === "FJ") return "Sword & Mace";
    if (arsenal === "TJ" || arsenal === "FP") return "Spear & Bow";
  }
  function GetAffinity(type) {
    const affinity = type[1] + type[3];

    if (affinity === "SP" || affinity === "NJ") return "Fire & Wind";
    if (affinity === "SJ" || affinity === "NP") return "Earth & Water";
  }

  const typeMemo = useMemo(
    () => ({
      FlipEnergy: () => SetEnergy(!energy),
      FlipPerceive: () => SetPerceive(!perceive),
      FlipJudge: () => SetJudge(!judge),
      FlipPreference: () => SetPreference(!preference),
      GetType,
      GetLabel,
      GetFunctionStack,
      GetFunctionName,
      GetQuadra,
      GetExpressionFull,
      GetExpression,
      GetCommunication,
      GetRole,
      GetGoalFocus,
      GetWorldviewFull,
      GetWorldview,
      GetTangibility,
      GetValue,
      GetProcess,
      GetArmament,
      GetArsenal,
      GetAffinity,
    }),
    [energy, perceive, judge, preference]
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
