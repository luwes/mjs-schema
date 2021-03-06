import test from 'ava';
import assert from 'assert';
import schema from '../../index.js';

test('original validate schema has a bug with regexp field validation.', function() {
  //object should have at least one String field
  var validation = schema({
    '+.+': String
  });
  var emptyObject = {};
  assert(false === validation(emptyObject));

  var emptyArray = [];
  assert(false === validation(emptyArray));
});

test('some fields are valid, all the rest are not', function() {
  var validation = schema({
    '+check.?': Number,
    '*': null
  });
  var correctObject = {
    check1: 1,
    check2: 2
  };
  assert(true, validation(correctObject));
  var incorrectObject = {
    check1: 1,
    check2: 2,
    someOther: 3
  };
  assert(false === validation(incorrectObject));
});

test('with allowed other fields', function() {
  var anotherValidation = schema({
    '+check.?': Number,
    '*': Number
  });
  var o1 = {
    check1: 1,
    check2: 2
  };
  var o2 = {
    check1: 1,
    check2: 2,
    someOther: 3
  };

  assert(true === anotherValidation(o1));
  assert(true === anotherValidation(o2));
});

test('empty object should be valid sometimes', function() {
  var allowAll = schema({
    '*': String
  });
  assert(true, allowAll({}));

  var allowSome = schema({
    check: [null, String]
  });
  assert(true === allowSome({}));
});
