function f(input) {
    const f = new Function(`return "Hello, " + ${input}`);
    console.log(f());
}
f("process.env.DUMMY_API_KEY");
f("process.env.DUMMY_DB_PASSWORD");
f("(() => { let n = 0;while (n<10) {console.log(n);n++;} })()");