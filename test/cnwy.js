var Client = require('node-rest-client').Client,
  parser = require('xml2json'),
  moment = require('moment'),
  _ = require('underscore');

describe('CNWY', function () {
  this.timeout(5000);

  it('can get rate', function (done) {
    var subroutine = function (query) {
      var rest = new Client({ user: query.user, password: query.password }),
        body = parser.toXml({
          RateRequest: {
            OriginZip: {
              country: 'us',
              '$t': query.fromZip
            },
            DestinationZip: {
              country: 'us',
              '$t': query.toZip
            },
            ChargeCode: { '$t': query.terms },
            EffectiveDate: { '$t': query.effectiveDate },
            Item: _.map(query.items, function (item) {
              return {
                CmdtyClass: { '$t': item.freightClass },
                Weight: {
                  unit: 'lbs',
                  '$t': item.weight
                }
              };
            })
          }
        });

      rest.post('https://www.con-way.com/XMLj/X-Rate', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: "RateRequest="+ body
      },
      function (data, r) {
        var quote = parser.toJson(data, { object: true }).RateQuote;
          result = {
            net: {
              amount: quote.NetCharge.$t,
              currency: quote.NetCharge.currency
            },
            charges: _.map(quote.AccessorialCharges, function (charge, key) {
              return {
                code: charge.code,
                amount: charge.$t
              };
            }),
            origin: {
              zip: quote.OriginZip.$t
            },
            destination: {
              zip: quote.DestinationZip.$t,
              eta: quote.EstDeliverDate
            }
          };
        done();
      });
    };

    subroutine({
      user: 'subroutine',
      password: 'xTuple123',
      fromZip: '23507',
      toZip: '23188',
      effectiveDate: moment().format('MM/DD/YY'),
      terms: 'P',
      items: [
        {
          weight: '500',
          freightClass: '50'
        }
      ]
    });
  });
});
