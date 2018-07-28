const expect = require('expect');

var {isRealString} = require('./validation.js');




describe('isRealString', () => {
     it('should reject none string values', () => {
         var res = isRealString(98);
         expect(res).toBe(false);
     });
     it('should reject string with only space', () => {
        var res = isRealString('    ');
         expect(res).toBe(false);
    });
    it('should allow string with non-space characters', () => {
        var res = isRealString('  Hamam  ');
         expect(res).toBe(true);
    });
});