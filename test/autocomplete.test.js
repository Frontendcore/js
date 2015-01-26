TinyCore.debugMode=!0,describe("Autocomplete",function(){beforeEach(function(a){TinyCore.AMD.require(["autocomplete"],function(){void 0!==a&&a()})}),it("should exist",function(){oTestedModule=TinyCore.Module.instantiate("autocomplete"),expect(oTestedModule).toBeTruthy()}),describe("oDefault",function(){it("should have all the parameters",function(){expect(oTestedModule.oDefault.limit).toBeDefined()})}),describe("onStart",function(){beforeEach(function(){spyOn(FC,"getDataModules"),spyOn(FC,"loadCSS"),spyOn(FC,"trackEvent"),spyOn(oTestedModule,"autobind"),oTestedModule.onStart()}),it("should exist",function(){expect(oTestedModule.onStart).toBeTruthy()}),it("should call FC.load CSS",function(){expect(FC.loadCSS).toHaveBeenCalled()}),it('should call FC.trackEvent with "JS_Libraries", "call", "autocomplete"',function(){expect(FC.trackEvent).toHaveBeenCalledWith("JS_Libraries","call","autocomplete")})}),describe("autobind",function(){beforeEach(function(){var a=$('<input name="toyName" value="foo" data-tc-values="foo,bar">');spyOn(jQuery.fn,"autocompleter"),spyOn(FC,"mixOptions"),oTestedModule.autobind(a[0])}),it("should exist",function(){expect(oTestedModule.autobind).toBeTruthy()}),it("should call jQuery autocompleter",function(){expect(jQuery.fn.autocompleter).toHaveBeenCalled()})})});