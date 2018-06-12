import { TestWindow } from '@stencil/core/testing';
import { MyComponent } from './my-component';
import * as Axe from 'axe-core';

describe('my-component', () => {
  it('should build', () => {
    expect(new MyComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLMyComponentElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MyComponent],
        html: '<my-component></my-component>'
      });
    });

    it('should have accessibility violations depending on values specified', async () => {
  
      const options: Axe.RunOptions = {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        },
      };
  
      const context: Axe.ElementContext = element;
      expect(context).not.toBeNull();
  
      await Axe.run(context).then(results => {
        expect(results.violations.length).toEqual(4);
      });
  
      await Axe.run(options).then(results => {
        expect(results.violations.length).toEqual(2);
        console.log(results.violations);
      });

      //If I use more than one param it fails but I am sure that the context variable is at fault even though is of ElementContext type.
      // await Axe.run(context, options).then(results => {
      //   expect(results.violations.length).toEqual(4);
      // });
    });
  });
});
