import renderer from 'react-test-renderer';
import { Button } from '../button';

describe('test Button component', () => {
  const buttonText = 'Click me!';
  const isTrue = true;

  it('render button without text', () => {
    const button = renderer.create(<Button />).toJSON()

    expect(button).toMatchSnapshot()
  })

  it('render button with text', () => {
    const button = renderer.create(<Button text={buttonText} />).toJSON()

    expect(button).toMatchSnapshot()
  })

  it('render button isLoader', () => {
    const button = renderer.create(<Button isLoader={isTrue} />).toJSON()

    expect(button).toMatchSnapshot()
  })

  it('render button isDisabled', () => {
    const button = renderer.create(<Button disabled={isTrue} />).toJSON()

    expect(button).toMatchSnapshot()
  })
})
