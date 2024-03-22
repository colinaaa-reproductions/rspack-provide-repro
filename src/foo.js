// change to
//
// class Foo
// export { Foo }
//
// will solve the problem
export class Foo {
  bar() {
    return 42;
  }
}

foo(Foo);

function foo(f) {
  console.log(f);
}
