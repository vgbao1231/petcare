import FormChip from './FormChip';
import FormFile from './FormFile';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTimePicker from './FormTimePicker';

// Abstract class (Creator)
class Field {
    // eslint-disable-next-line no-unused-vars
    create(props) {
        throw new Error('You must implement create() method');
    }
}

// Concrete creator
class InputField extends Field {
    create(props) {
        return <FormInput {...props} />;
    }
}

class SelectField extends Field {
    create(props) {
        return <FormSelect {...props} />;
    }
}

class FileField extends Field {
    create(props) {
        return <FormFile {...props} />;
    }
}

class ChipField extends Field {
    create(props) {
        return <FormChip {...props} />;
    }
}

class DateField extends Field {
    create(props) {
        return <FormTimePicker type="date" {...props} />;
    }
}

class TimeField extends Field {
    create(props) {
        return <FormTimePicker type="time" {...props} />;
    }
}

class DateTimeField extends Field {
    create(props) {
        return <FormTimePicker type="datetime" {...props} />;
    }
}

// Factory Method nằm trong một lớp quản lý
export class FieldFactory {
    getField(type) {
        switch (type) {
            case 'input':
                return new InputField();
            case 'select':
                return new SelectField();
            case 'file':
                return new FileField();
            case 'chip':
                return new ChipField();
            case 'date':
                return new DateField();
            case 'time':
                return new TimeField();
            case 'datetime':
                return new DateTimeField();
            default:
                return new InputField();
        }
    }
}
