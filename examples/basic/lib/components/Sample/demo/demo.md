
Sample component:

    <span>
      <Sample
        required="Best component ever"
      />
    </span>

Использовать только в экстренных случаях.

    const mockData = require('./mocks');
    <span>
      <Sample
        string="Best component zad"
        list="big"
        booliat={true}
        array={['zad', 'zad', 'zad']}
        required="Best component ever"
        integer={5}
        node={<div>😱</div>}
        stringObjects={{1: 'Alexander', 2:'Nevski'}}
        arrayOfShapes={[
          { id: 1, name: 'Like' },
          { id: 4, name: 'that' },
        ]}
        mockedShape={mockData.shape}
        onCallback={(...atr) => {console.log(atr)}}
      />
    </span>
