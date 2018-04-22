class BaseFilter {
    constructor(propertyName, expectedValue) {
        this.propertyName = propertyName
        this.expectedValue = expectedValue
    }

    _validateProperty(value) {
        return true;
    }

    validate(object) {
        return object.hasOwnProperty(this.propertyName)
        && this._validateProperty(object[this.propertyName])
    }

}

class StringFilter extends BaseFilter {
    constructor(propertyName, expectedValue) {
        super(propertyName, expectedValue.toLowerCase())
    }

    _validateProperty(value) {
        return value.toString().toLowerCase().includes(this.expectedValue)
    }
}

class NumberFilter extends BaseFilter {
    constructor(propertyName, expectedValue) {
        super(propertyName, expectedValue)
    }

    _validateProperty(value) {
        return typeof value === 'number' && value === this.expectedValue
    }
}

function createFilter(propertyName, expectedValue, type) {
    type = type || typeof expectedValue
    if (type === 'number' || type === Number) {
        return new NumberFilter(propertyName, Number(expectedValue))
    } else if (type === 'string' || type === String) {
        return new StringFilter(propertyName, expectedValue)
    }
    throw new Error('Unsupported filter type: ' + typeof expectedValue);
}

/**
 * 
 * @param {*} data data to filter
 * @param {*} filtersSettings object with filtered fields as names and filtering values as value
 * @param {Object} allowedTypes (optional) object which keys are allowed keys and values are recommended type of filter
 */
module.exports = function filterData (data, filtersSettings, allowedTypes = {}) {
    let allowedFilters = Object.keys(filtersSettings)
    if (Object.keys(allowedTypes).length > 0) {
        allowedFilters = allowedFilters.filter((key) => allowedTypes.hasOwnProperty(key))
    }
    const filters = allowedFilters.map((propertyName) => createFilter(propertyName, filtersSettings[propertyName], allowedTypes[propertyName]))
    return data.filter((record) => filters.reduce((state, filter) => state && filter.validate(record), true))
}