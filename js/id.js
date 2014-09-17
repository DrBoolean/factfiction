define([], function () {
	function _Id(a) {
	  this.val = a;
	}

	// Semigroup (val must also be a Semigroup)
	_Id.prototype.concat = function(b) {
	    return new _Id(this.val.concat(b.val));
	};

	// Monoid (val must also be a Monoid)
	_Id.prototype.empty = function() {
	    return new _Id(this.val.empty ? this.val.empty() : this.val.constructor.empty());
	};

	// Functor
	_Id.prototype.map = function(f) {
	    return new _Id(f(this.val));
	};

	// Applicative
	_Id.prototype.ap = function(b) {
	    return new _Id(this.val(b.val));
	};

	// Chain
	_Id.prototype.chain = function(f) {
	    return f(this.val);
	};

	// Monad
	_Id.of = function(a) {
	    return new _Id(a);
	};

	_Id.prototype.runId = function() { return this.val; };

	var inspect = function(x) {
    if(x==null || x==undefined) return "null";
    return x.inspect ? x.inspect() : x;
  }

  _Id.prototype.inspect = function() {
    return 'Identity('+inspect(this.val)+')';
  }

  _Id.prototype.toString = function() { return this.inspect(); }

  function Id(a) {
	  return new _Id(a)
	}

  Id.of = _Id.of;

	return Id;
});
