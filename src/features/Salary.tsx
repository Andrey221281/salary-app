import React from 'react';
import { withTypes, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { inputValue, withNDFL, Values, Stooge, inStooge } from './salarySlice';
import { RootState } from 'app/store';
import { Banner } from 'components/Banner';
import { Tooltip } from 'components/Tooltip';

const { Form } = withTypes<Values>();

const Salary: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(true);
  const [togleSalary, setTogleSalary] = React.useState<string>('');

  const dispatch = useDispatch();
  const {
    salaryOnHands,
    salaryInMonth,
    ndfl,
    salaryOnDay,
    checkNDFL,
  } = useSelector((state: RootState) => state);

  const withNdfl = classnames('text-small text-bold me-2', {
    'text-secondary': checkNDFL,
  });
  const withoutNdfl = classnames('text-small text-bold ms-2', {
    'text-secondary': !checkNDFL,
  });

  function handleChange(event: React.SyntheticEvent<HTMLFormElement>) {
    const target = event.target as HTMLInputElement;
    setTogleSalary(target.value);
    switch (target.name) {
      case 'input':
        dispatch(inputValue(parseInt(target.value)));
        break;
      case 'checkNDFL':
        dispatch(withNDFL(target.checked));
        break;
      case 'stooge':
        dispatch(inStooge(target.value));
        setOpen(false);

        if (target.value === 'month') {
          setOpen(true);
        }
        break;
      default:
        return;
    }
  }

  return (
    <div className="salary-form position-relative border-start p-5 ">
      <h1 className="text-secondary text-small mb-2 text-bold">Сумма</h1>
      <Form
        onSubmit={() => {}}
        initialValues={{ checkNDFL: true, stooge: 'month' }}
        subscription={{
          submitting: false,
          pristine: true,
        }}
        render={() => (
          <form onChange={handleChange} className="form-check">
            <div className="">
              <Field<Stooge>
                name="stooge"
                component="input"
                type="radio"
                value="month"
              />
              <label>Оклад за месяц</label>
            </div>
            <div>
              <Field<Stooge>
                name="stooge"
                component="input"
                type="radio"
                value="mrot"
              />
              <label>МРОТ</label>
              <Tooltip />
            </div>
            <div>
              <Field<Stooge>
                name="stooge"
                component="input"
                type="radio"
                value="day"
              />
              <label>Оплата за день</label>
            </div>
            <div>
              <Field<Stooge>
                name="stooge"
                component="input"
                type="radio"
                value="hour"
              />
              <label>Оплата за час</label>
            </div>
            <div className="mt-3 ms-4">
              <span className={withNdfl}>Указать с НДФЛ</span>
              <Field<boolean>
                name="checkNDFL"
                component="input"
                type="checkbox"
              />
              <label className={withoutNdfl}>Без НДФЛ</label>
            </div>
            <div className="mt-3 ms-4">
              <Field<number>
                defaultValue={salaryOnDay}
                type="number"
                name="input"
                component="input"
                format={(value) => (value === 0 ? '' : value)}
              />
              <label className="ms-2 text-bold"> ₽</label>
              {togleSalary === 'day' ? (
                <span className="text-bold ms-2">В день</span>
              ) : togleSalary === 'hour' ? (
                <span className="text-bold ms-2">В час</span>
              ) : (
                ''
              )}
            </div>
          </form>
        )}
      />
      {salaryOnHands > 0 && open && (
        <Banner
          salaryOnHands={salaryOnHands}
          ndfl={ndfl}
          salaryInMonth={salaryInMonth}
        />
      )}
    </div>
  );
};
export default Salary;
