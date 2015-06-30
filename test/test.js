/* Copyright 2015 Clemens N. Klokmose, Aarhus University

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var jsonml = require("../index.js");
var assert = require("assert");

/*
TESTLIST

 + ["foo"] should return <foo></foo>
 + ["foo", ["bar"]] should return <foo><bar></bar></foo>
 + ["foo", "bar", ["baz"]] should return <foo>bar<baz></baz>
 + ["foo", {"bar": "baz"}] should return <foo bar="baz"></foo>
 + ["foo", ["bar", ["baz"]]] should return <foo><bar><baz></baz></bar></foo>
 + [{}] should throw an error
 + ["foo", ["bar", [{}]]] should throw an error
 + ["foo", "bar", {}] should throw an error
 + "foo" should return "foo"
 + ["foo", {bar: true}] should return <foo bar="true"></foo>
 + ["foo", ["bar"], ["baz"]] should return <foo><bar></bar><baz></baz></foo>
 + ["foo", {hello: "world"}, ["bar"], ["baz"]] should return <foo hello="world"><bar></bar><baz></baz></foo>
 
*/

describe("JsonML", function() {
   describe("#toXML()", function() {
       
       it('should return <foo></foo> on ["foo"]', function() {
           assert.equal("<foo></foo>", jsonml.toXML(['foo']));
       });
       
       it('should return <foo><bar></bar></foo> on ["foo", ["bar"]]', function() {
           assert.equal("<foo><bar></bar></foo>", jsonml.toXML(["foo", ["bar"]])); 
       });
       
       it('should return <foo><bar><baz></baz></bar></foo> on ["foo", ["bar", ["baz"]]]', function() {
           assert.equal("<foo><bar><baz></baz></bar></foo>", jsonml.toXML(["foo", ["bar", ["baz"]]])); 
       });
       
       it('should return <foo>bar<baz></baz> on ["foo", "bar", ["baz"]]', function() {
           assert.equal("<foo>bar<baz></baz></foo>", jsonml.toXML(["foo", "bar", ["baz"]]));
       });
       
       it('should return <foo bar="baz"></foo> on ["foo", {"bar": "baz"}]', function() {
           assert.equal('<foo bar="baz"></foo>', jsonml.toXML(["foo", {"bar": "baz"}]));
       });
       
       it('should return "foo on ["foo"]"', function() {
           assert.equal('foo', jsonml.toXML("foo"));
       });
       
       it('should return <foo bar="true"></foo> on ["foo", {bar: true}]', function() {
           assert.equal('<foo bar="true"></foo>', jsonml.toXML(["foo", {bar: true}])) ;
       });
       
       it('should return <foo><bar></bar><baz></baz></foo> on ["foo", ["bar"], ["baz"]]', function() {
           assert.equal('<foo><bar></bar><baz></baz></foo>', jsonml.toXML(["foo", ["bar"], ["baz"]]));
       });
       
       it('should return <foo hello="world"><bar></bar><baz></baz></foo> on ["foo", {hello: "world"} ["bar"], ["baz"]]', function() {
           assert.equal('<foo hello="world"><bar></bar><baz></baz></foo>', jsonml.toXML(["foo", {hello: "world"}, ["bar"], ["baz"]]));
       });
       
       it('should throw an error on [{}]', function() {
           assert.throws( function() { jsonml.toXML([{}]) }, Error, "Invalid JsonML");
       })
       
       it('should throw an error on ["foo", ["bar", [{}]]]', function() {
           assert.throws( function() { jsonml.toXML(["foo", ["bar", [{}]]]) }, Error, "Invalid JsonML");
       })
       
       it('should throw an error on ["foo", "bar", {}]', function() {
           assert.throws( function() { jsonml.toXML(["foo", "bar", {}]) }, Error, "Invalid JsonML");
       })
       
   }); 
});