import renderer from 'react-test-renderer';
import { ElementStates } from '../../../../types/element-states';
import { Circle } from '../circle';

describe('test Circle component', () => {
  const letterText = 'I am letter!';
  const isTrue = true;

  it('render Circle without letter', () => {
    const circle = renderer.create(<Circle />).toJSON()

    expect(circle).toMatchSnapshot()
  })

  it('render Circle with letter', () => {
    const circle = renderer.create(<Circle letter={letterText} />).toJSON()

    expect(circle).toMatchSnapshot()
  })

  it('render Circle with head', () => {
    const circle = renderer.create(<Circle head />).toJSON()

    expect(circle).toMatchSnapshot()
  })

  it('render Circle with element in head', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON()

    expect(circle).toMatchSnapshot()
  })

  it('render Circle with tail', () => {
    const circle = renderer.create(<Circle tail />).toJSON()

    expect(circle).toMatchSnapshot()
  })

  it('render Circle with element in tail', () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON()

    expect(circle).toMatchSnapshot()
  })

  it('render Circle with index', () => {
    const circle = renderer.create(<Circle index />).toJSON()

    expect(circle).toMatchSnapshot()
  })

  it('render Circle with isSmall', () => {
    const circle = renderer.create(<Circle isSmall={isTrue} />).toJSON()

    expect(circle).toMatchSnapshot()
  })

  it('render Circle with state Default', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON()

    expect(circle).toMatchSnapshot()
  })

  it('render Circle with state Changing', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON()

    expect(circle).toMatchSnapshot()
  })


  it('render Circle with state Modified', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON()

    expect(circle).toMatchSnapshot()
  })

})