import { Result } from "./Result.js";
import { ResultRender } from "./ResultRender.js";
import { RawResult } from "./interfaces";
import { resultsArr, resultsRenderArr } from "./script.js";

async function getResults(): Promise<RawResult[]> {
    return await (await fetch("../../../data/results.json")).json();
}

function createResultArr(rawResultsArr: RawResult[]) {
    for (const rawResult of rawResultsArr) {
        const newResult = new Result(
            rawResult.id,
            rawResult.memberId,
            rawResult.competitionLocation,
            rawResult.competitionName,
            rawResult.competitionPlacement,
            rawResult.date,
            rawResult.discipline,
            rawResult.resultType,
            rawResult.time
        );

        resultsArr.push(newResult);
    }
}

function createResultRenderArr(results: Result[]) {
    for (const result of results) {
        const newResult = new ResultRender(result);

        resultsRenderArr.push(newResult);
    }
}

export { createResultArr, createResultRenderArr, getResults }; 
