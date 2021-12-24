/**
 * Effects (функции которые отслеживают выполнение redux action)
 * take - ждет выполнения указанного action (выполняет 1 раз действие)
 * takeEvery - при каждом диспатче переданного action вызывает воркера
 * takeLatest - автоматически отменяет любую задачу, запушенную ранее если она выполняется
 * takeLeading - Обратное от takeLatest, отменяет любую последующую задачу, если первая не выполнилась
 * put - отправить действие в store (задиспатчить)
 * call - позволяет работать с асинхронными функциями для упрощения тестирования (чтобы была возможность мокать данные)
 * fork - как call, но неблокирующий (позволяет сделать неблокирующий вызов функции)
 * 2 вида эффектов:
 *  1) Блокирующие (call, take)
 *  2) Неблокирующие (fork)
 *
 * Термины:
 * Воркеры - Функции с бизнес логикой, вызываемые в вотчерах в эффектах
 * Вотчеры (watch) - Функция отслеживающая диспатч в стор в которой выполняются воркеры
 * Блокирующие эффекты - Останавливает выполнение саги пока не произойдет диспатч action
*/

import {put, call, fork, takeLeading} from 'redux-saga/effects'

const getData = async (pattern) => {
    const request = await fetch(`https://swapi.dev/api/${pattern}/`)
    const data = await request.json()
    return data
}

const loadPeople = function* () {
    const datePeople = yield call(getData, 'people')
    yield put({type: 'SET_PEOPLE', payload: datePeople.results})
}

const loadPlanets = function* () {
    const datePlanets = yield call(getData, 'planets')
    yield put({type: 'SET_PLANETS', payload: datePlanets.results})
}

const workerForLoadData = function* () {
    yield fork(loadPeople)
    yield fork(loadPlanets)
}

const watchClickSage = function* () {
    yield takeLeading('LOAD_PEOPLE_AND_PLANETS', workerForLoadData)
}

const rootSage = function* () {
    yield watchClickSage()
}

export default rootSage