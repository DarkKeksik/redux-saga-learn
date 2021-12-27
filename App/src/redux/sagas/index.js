/**
 * Effects (Функции которые отслеживают выполнение redux action)
 * take - Ждет выполнения указанного action (выполняет 1 раз действие)
 * takeEvery - При каждом диспатче переданного action вызывает воркера
 * takeLatest - Автоматически отменяет любую задачу, запушенную ранее если она выполняется
 * takeLeading - Обратное от takeLatest, отменяет любую последующую задачу, если первая не выполнилась
 * put - Отправить действие в store (задиспатчить)
 * call - Позволяет работать с асинхронными функциями для упрощения тестирования (чтобы была возможность мокать данные)
 * fork - Как call, но неблокирующий:
 * (позволяет сделать неблокирующий вызов функции, но при возникновлении ошибки падает родительский воркер)
 * spawn - Как fork, но не привязан к родителю и при ошибке родительский воркер продолжит работать
 * join - Заблокировать не блокирующую задачу и получить ее результат
 * select - Позволяет получить данные из store, аналог useSelect
 * 2 вида эффектов:
 *  1) Блокирующие (call, take)
 *  2) Неблокирующие (fork)
 *
 * Термины:
 * Воркеры - Функции с бизнес логикой, вызываемые в вотчерах в эффектах
 * Вотчеры (watch) - Функция отслеживающая диспатч в стор в которой выполняются воркеры
 * Блокирующие эффекты - Останавливает выполнение саги пока не произойдет диспатч action
 *
 * PS
 * 1) Если произошла ошибка в fork родительский воркер не отработает, тк он привязан к нему, в отличии от spawn
 * 2) Best practice, саги должны работать автономно, вне зависимости от store и лучше данные брать из action
*/

import {put, call, fork, takeLeading, spawn, select} from 'redux-saga/effects'

const getData = async (pattern) => {
    const request = await fetch(`https://swapi.dev/api/${pattern}/`)
    return await request.json()
}

const loadPeople = function* () {
    const { results } = yield call(getData, 'people')
    yield put({type: 'SET_PEOPLE', payload: results})
    return results
}

const loadPlanets = function* () {
    const { results } = yield call(getData, 'planets')
    yield put({type: 'SET_PLANETS', payload: results})
}

const workerForLoadData = function* () {
    yield spawn(loadPeople)
    yield spawn(loadPlanets)

    // Выведет устаревший стор, тк эффекты выше ассинхронны
    const store = yield select((s) => s)
    console.log('Store', store)
}

const watchLoadDataSaga = function* () {
    yield takeLeading('LOAD_PEOPLE_AND_PLANETS', workerForLoadData)
}

const rootSage = function* () {
    yield fork(watchLoadDataSaga)
}

export default rootSage