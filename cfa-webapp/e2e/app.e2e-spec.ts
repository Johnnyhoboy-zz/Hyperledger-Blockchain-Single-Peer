/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for cfa-webapp', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be cfa-webapp', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('cfa-webapp');
    })
  });

  it('network-name should be cfa-perishable@0.2.6-deploy.166',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('cfa-perishable@0.2.6-deploy.166.bna');
    });
  });

  it('navbar-brand should be cfa-webapp',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('cfa-webapp');
    });
  });

  
    it('Case component should be loadable',() => {
      page.navigateTo('/Case');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Case');
      });
    });

    it('Case table should have 8 columns',() => {
      page.navigateTo('/Case');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Order component should be loadable',() => {
      page.navigateTo('/Order');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Order');
      });
    });

    it('Order table should have 19 columns',() => {
      page.navigateTo('/Order');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(19); // Addition of 1 for 'Action' column
      });
    });
  
    it('Contract component should be loadable',() => {
      page.navigateTo('/Contract');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Contract');
      });
    });

    it('Contract table should have 12 columns',() => {
      page.navigateTo('/Contract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Business component should be loadable',() => {
      page.navigateTo('/Business');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Business');
      });
    });

    it('Business table should have 5 columns',() => {
      page.navigateTo('/Business');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('OrderPlaced component should be loadable',() => {
      page.navigateTo('/OrderPlaced');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('OrderPlaced');
      });
    });
  
    it('OrderShipped component should be loadable',() => {
      page.navigateTo('/OrderShipped');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('OrderShipped');
      });
    });
  
    it('OrderDelivered component should be loadable',() => {
      page.navigateTo('/OrderDelivered');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('OrderDelivered');
      });
    });
  
    it('OrderComplete component should be loadable',() => {
      page.navigateTo('/OrderComplete');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('OrderComplete');
      });
    });
  
    it('TemperatureReading component should be loadable',() => {
      page.navigateTo('/TemperatureReading');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TemperatureReading');
      });
    });
  
    it('LocationReading component should be loadable',() => {
      page.navigateTo('/LocationReading');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('LocationReading');
      });
    });
  
    it('SetupDemo component should be loadable',() => {
      page.navigateTo('/SetupDemo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetupDemo');
      });
    });
  

});