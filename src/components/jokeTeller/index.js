import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

export default function JokeTeller(props) {
  const {
    fetchedData,
    languagesData,
    flagsData,
    formatData,
    typeDataPro,
    rangeData,
  } = props;
  const categoryList = [
    "Christmas",
    "Spooky",
    "Programming",
    "Pun",
    "Dark",
    "Misc",
  ];
  const namesChange = ["single", "twopart"];
  const initialValue = "Any";
  const [categoryType, setCategoryType] = useState(initialValue);
  const [values, setValues] = useState([]);
  const [selectedLang, setLang] = useState("en");
  const [rangeTaken, setRangeTaken] = useState([0, 6]);
  const [lowRange, setLowRange] = useState(0);
  const [highRange, setHighRange] = useState(0);
  const [countJokes, setCountJokes] = useState(1);
  const [flag, setFlag] = useState([]);
  const [format, setFormat] = useState("json");
  const [name, setName] = useState(["single", "twopart"]);
  const [search, setSearch] = useState("");
  const [api, setApi] = useState("https://v2.jokeapi.dev/joke/Any");
  const [blurCat, setBlurCat] = useState(false);
  const [blurName, setBlurName] = useState(false);
  const [blurRange, setBlurRange] = useState(false);
  const [fetched, setFetched] = useState({});
  const [delivery, setDelivery] = useState(false);

  useEffect(() => {
    onBlurCategory();
    onBlurName();
    onBlurRange();
    const categorySet = categoryType === "Any" ? "Any" : `${values.join(",")}`;
    const langSet = selectedLang === "en" ? "" : `lang=${selectedLang}`;
    const flagsSet =
      flag.length === 0 ? "" : `blacklistFlags=${flag.join(",")}`;
    const formatSet = format === "json" ? "" : `format=${format}`;
    const nameSet =
      name.length === 2 || name.length === 0 ? "" : `type=${name[0]}`;
    const searchSet = search === "" ? "" : `contains=${search}`;
    const rangeSet =
      JSON.stringify([Number(lowRange), Number(highRange)]) ===
      JSON.stringify(rangeData[selectedLang])
        ? ""
        : lowRange === highRange
        ? `idRange=${highRange}`
        : `idRange=${lowRange}-${highRange}`;
    console.log(rangeSet);
    const countJokesSet = Number(countJokes) <= 1 ? "" : `amount=${countJokes}`;
    const allData = [
      langSet,
      flagsSet,
      formatSet,
      nameSet,
      searchSet,
      rangeSet,
      countJokesSet,
    ];
    const maped = allData.filter((each) => each !== "");

    const stringified = `?${maped.join("&")}`;
    console.log(maped);
    setApi(
      `https://v2.jokeapi.dev/joke/${categorySet}${
        maped.length === 0 ? "" : stringified
      }`
    );
  }, [
    categoryType,
    values,
    selectedLang,
    rangeTaken,
    lowRange,
    highRange,
    countJokes,
    flag,
    format,
    name,
    search,
    api,
  ]);

  const onClickDeliver = (event) => {
    const deliverP = fetched.jokes.map((each) => {
      if (each.id === event.target.id) {
        return { ...each, isDel: !each.isDel };
      } else {
        return { ...each };
      }
    });
    setFetched((prev) => ({ ...prev, jokes: deliverP }));
  };

  const sendRequest = async () => {
    const response = await fetch(api);
    const data = await response.json();
    console.log(api);
    console.log(typeof data);
    console.log(data);
    if (data.type === undefined) {
      const datafetch = data.jokes.map((each) => {
        return { ...each, id: uuidv4(), isDel: false };
      });

      const arrayD = {};
      datafetch.map((each) => {
        return (arrayD[each.id] = false);
      });
      data.jokes = datafetch;
      setFetched(data);
    } else {
      setDelivery(false);
      setFetched(data);
    }
  };
  useEffect(() => {
    if (rangeData) {
      const rangeOf =
        rangeData[selectedLang] === undefined
          ? [0, 1]
          : rangeData[selectedLang];
      setLowRange(Math.min(...rangeOf));
      setHighRange(Math.max(...rangeOf));
      setRangeTaken(rangeOf);
    }
  }, [rangeData, selectedLang]);

  const onBlurCategory = () => {
    if (categoryType === "Custom" && values.length === 0) {
      setBlurCat(true);
    } else {
      setBlurCat(false);
    }
  };

  const onBlurName = () => {
    if (name.length === 0) {
      setBlurName(true);
    } else {
      setBlurName(false);
    }
  };

  const onBlurRange = () => {
    if (
      Number(lowRange) > Number(highRange) ||
      Number(highRange) < Number(lowRange) ||
      Number(highRange) === 0
    ) {
      setBlurRange(true);
    } else {
      setBlurRange(false);
    }
  };
  const setCatValues = (event) => {
    console.log(values);
    if (!event.target.checked) {
      const getValues = values;
      // const index=getValues.indexOf(event.target.value)
      // getValues.splice(index,1)
      // console.log(getValues)
      setValues(getValues.filter((each) => each !== event.target.value));
    } else {
      setValues((prev) => [...prev, event.target.value]);
    }
  };

  const setTypeValues = (event) => {
    console.log(name);
    if (!event.target.checked) {
      const getType = name;
      // const index=getType.indexOf(event.target.value)
      // getType.splice(index,1)
      // console.log()
      setName(getType.filter((each) => each !== event.target.value));
    } else {
      setName((prev) => [...prev, event.target.value]);
    }
  };
  const setFlageValues = (event) => {
    console.log(flag);
    if (!event.target.checked) {
      const getFlag = flag;
      // const index=getFlag.indexOf(event.target.value)
      // getFlag.splice(index,1)
      // console.log(getFlag)
      setFlag(getFlag.filter((each) => each !== event.target.value));
    } else {
      setFlag((prev) => [...prev, event.target.value]);
    }
  };
  const typeCategory = categoryType !== "Custom";

  const getOptions = () => {
    return (
      <ul data-testid="normal" id="options" className="options-container">
        {fetchedData &&
          fetchedData.map((each) => (
            <li key={each}>
              <input
                data-testid={`${each}-id`}
                type="checkbox"
                id={each}
                value={each}
                onChange={setCatValues}
                disabled={typeCategory}
              />
              <label htmlFor={each}>{each}</label>
            </li>
          ))}
      </ul>
    );
  };
  const getLanguages = () => {
    let languageNames = new Intl.DisplayNames(["en"], { type: "language" });
    return (
      <select
        name="languages"
        id="languages"
        data-testid="languages"
        value={selectedLang}
        onChange={(e) => {
          setLang(e.target.value);
        }}
      >
        {languagesData &&
          languagesData.map((each) => {
            return (
              <option key={each.lang} value={each.lang}>
                {each.lang}-{languageNames.of(each.lang)}
              </option>
            );
          })}
      </select>
    );
  };

  const getFlags = () => {
    return (
      <ul id="ul" className="options-container field-cont">
        <li>(optional)</li>
        {flagsData &&
          flagsData.map((each) => {
            return (
              <li key={each} data-testid={each} id={each}>
                <input type="checkbox" value={each} onChange={setFlageValues} />
                <label>{each}</label>
              </li>
            );
          })}
      </ul>
    );
  };

  const getFormats = () => {
    return (
      <ul className="options-container field-cont">
        {formatData &&
          formatData.map((each) => {
            if (each === "json") {
              return (
                <li key={each}>
                  <input
                    type="radio"
                    name="format"
                    value={each}
                    defaultChecked
                    onChange={(e) => {
                      setFormat(e.target.value);
                    }}
                  />
                  <label>default ({each})</label>
                </li>
              );
            } else {
              return (
                <li key={each}>
                  <input
                    type="radio"
                    name="format"
                    value={each}
                    onChange={(e) => {
                      setFormat(e.target.value);
                    }}
                  />
                  <label>{each}</label>
                </li>
              );
            }
          })}
      </ul>
    );
  };

  const getTypes = () => {
    console.log(typeDataPro);
    return (
      <ul className={`options-container field-cont ${nameBorder}`}>
        {namesChange.map((each) => {
          return (
            <li key={each}>
              <input
                id={each}
                data-testid={each}
                type="checkbox"
                value={each}
                onChange={setTypeValues}
                checked={name.includes(each)}
              />
              <label htmlFor={each}>{each}</label>
            </li>
          );
        })}
      </ul>
    );
  };
  const dataFetchDis = () => {
    let DelButton = false;
    if (fetched.amount) {
      return (
        <div data-testid="joke">
          {fetched.jokes.map((each) => {
            console.log(each.type);
            DelButton = each.type === "twopart";
            return (
              <div data-testid="isThere" className="head" key={each.id}>
                {each.type === "twopart" && (
                  <div>
                    {console.log(DelButton)}
                    <h3>{each.setup}</h3>
                    {each.isDel && <p>{each.delivery}</p>}
                    <button
                      data-testid="twopartTest"
                      id={each.id}
                      onClick={onClickDeliver}
                    >
                      Delivery
                    </button>
                  </div>
                )}
                {each.type === "single" && (
                  <div data-testid="isThere">
                    <p data-testid="singleTest" id="singleTest">
                      {each.joke}
                    </p>
                  </div>
                )}
                {each.type === undefined && (
                  <div>
                    <p>(Set parameters and click "Send Request" above)</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div data-testid="joke" className="head">
          {fetched.type === "twopart" && (
            <div data-testid="isThere">
              <p>{fetched.setup}</p>
              {delivery && <p>{fetched.delivery}</p>}
              <button
                data-testid="twopartTest"
                id="twopartTest"
                onClick={() => setDelivery((prev) => !prev)}
              >
                Delivery
              </button>
            </div>
          )}
          {fetched.type === "single" && (
            <div data-testid="isThere">
              <p data-testid="singleTest" id="singleTest">
                {fetched.joke}
              </p>
            </div>
          )}
        </div>
      );
    }
  };
  console.log(fetched);
  const catBorder = blurCat ? "border-red" : "";
  const nameBorder = blurName ? "border-red" : "";
  const rangeBlur = blurRange ? "border-red" : "";
  return (
    <>
      <div className="container">
        <div className="container-main">
          <div className={`selected-container`}>
            <h3 className="name-field">
              select <span>Category /</span>
              <span>Categories:</span>
            </h3>
            <div className={`field-cont ${catBorder}`}>
              <input
                id="any-id"
                data-testid="any"
                type="radio"
                name="category"
                value="Any"
                defaultChecked
                onChange={(event) => setCategoryType(event.target.value)}
              />
              <label>Any</label>
              <div className="options-container">
                <input
                  id="custom-Id"
                  data-testid="custom"
                  type="radio"
                  name="category"
                  value="Custom"
                  onChange={(event) => setCategoryType(event.target.value)}
                />
                <label>Custom</label>
                {getOptions()}
              </div>
            </div>
          </div>
          <div className="selected-container">
            <h3 className="name-field">
              Select <span>languages</span>:
            </h3>
            <div className="field-cont">{getLanguages()}</div>
          </div>
          <div className="selected-container">
            <h3 className="name-field">
              Select <span>Flag</span> to blacklist:
            </h3>
            {getFlags()}
          </div>
          <div className="selected-container">
            <h3 className="name-field">
              Select response <span>format:</span>
            </h3>
            {getFormats()}
          </div>
          <div className="selected-container">
            <h3 className="name-field">
              Select at least one <span>joke type:</span>
            </h3>
            {getTypes()}
          </div>

          <div className="selected-container">
            <h3 className="name-field">
              Search for a joke that contains this <span>search string</span>:
            </h3>
            <div className="field-cont">
              <input
                data-testid="contains"
                id="contains"
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="selected-container">
            <h3 className="name-field">
              Search for a joke in this <span>ID range</span>:
            </h3>
            <div className={`field-cont ${rangeBlur}`}>
              <label>(optional)</label>
              <label>{"  "}</label>
              <label>From:</label>
              <input
                id="lowRange"
                data-testid="lowRange"
                type="number"
                min={Math.min(...rangeTaken)}
                max={Math.max(...rangeTaken)}
                value={lowRange}
                onChange={(e) => {
                  setLowRange(e.target.value);
                }}
              />{" "}
              <label>to</label>{" "}
              <input
                id="highRange"
                data-testid="highRange"
                type="number"
                min={Math.min(...rangeTaken)}
                max={Math.max(...rangeTaken)}
                value={highRange}
                onChange={(e) => {
                  setHighRange(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="selected-container">
            <h3 className="name-field">
              <span>Amount</span> of jokes:
            </h3>
            <div className="field-cont">
              <input
                id="amount"
                data-testid="amount"
                type="number"
                min={1}
                max={10}
                value={countJokes}
                onChange={(e) => {
                  setCountJokes(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="field-cont">
            <label>URL:</label>
            <h2 id="api" data-testid="api">
              {" "}
              {api}
            </h2>
            <div>
              <button type="button">clearForm</button>
              <button
                data-testid="sendRequest"
                id="sendRequest"
                type="button"
                onClick={sendRequest}
              >
                send request
              </button>
            </div>
          </div>
          <div className="result-cont">
            <h2 className="head">
              <span>{"</>"}</span>Result
            </h2>
            <hr />
            {dataFetchDis()}
            {fetched.error && (
              <div className="head">
                <p>{fetched.causedBy[0]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
