import tracer from './tracing';
import { insertToDb, connectToDb, disconnectFromDb, asyncFindUserInDb, promiseFindUserInDb } from './mongo';

connectToDb('mongodb://localhost/exampleDb');

const span = tracer.startSpan('mongoose test root span');
span.setAttribute('attr key', 'attr val');
tracer.withSpan(span, async () => {
    await insertToDb();

    // when using mongoose `findOne` with `await` syntax, the span context is lost
    await asyncFindUserInDb();

    // when using mongoose `findOne` with `Promise.then` syntax, the root span context is preserved
    promiseFindUserInDb().then(async userFromDb => {
        console.log(`fetched user from db with promise syntax: ${userFromDb}`);
        span.end();
        await disconnectFromDb();
    })
})
