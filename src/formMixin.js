import { get as objGet, forEach, isNil, isArray, isString, isFunction } from "lodash";

export default {
	methods: {
		// Get style classes of field
		getFieldRowClasses(field) {
			const hasErrors = this.fieldErrors(field).length > 0;
			let baseClasses = {
				[objGet(this.options, "validationErrorClass", "error")]: hasErrors,
				[objGet(this.options, "validationSuccessClass", "valid")]: !hasErrors,
				disabled: this.fieldDisabled(field),
				readonly: this.fieldReadonly(field),
				featured: this.fieldFeatured(field),
				required: this.fieldRequired(field),
				collapsed: this.fieldCollapsed(field),
				collapsible: this.fieldCollapsible(field)
			};

			if (isArray(field.styleClasses)) {
				forEach(field.styleClasses, c => (baseClasses[c] = true));
			} else if (isString(field.styleClasses)) {
				baseClasses[field.styleClasses] = true;
			}

			if (!isNil(field.type)) {
				baseClasses["field-" + field.type] = true;
			}

			return baseClasses;
		},
		fieldErrors(field) {
			let res = this.errors.filter(e => e.field === field);
			return res.map(item => item.error);
		},
		// Get disabled attr of field
		fieldDisabled(field) {
			if (isFunction(field.disabled)) return field.disabled.call(this, this.model, field, this);

			if (isNil(field.disabled)) return false;

			return field.disabled;
		},
		fieldCollapsed(field) {
			if (isFunction(field.collapsed)) return field.collapsed.call(this, this.model, field, this);

			if (isNil(field.collapsed)) {
				field.collapsed = false;
				// return false; 
			}

			return field.collapsed;
		},
		fieldCollapsible(field) {
			if (isNil(field.collapsible)) return false;

			return field.collapsible;
		},
		// Get readonly prop of field
		fieldReadonly(field) {
			if (isFunction(field.readonly)) return field.readonly.call(this, this.model, field, this);

			if (isNil(field.readonly)) return false;

			return field.readonly;
		},
		// Get featured prop of field
		fieldFeatured(field) {
			if (isFunction(field.featured)) return field.featured.call(this, this.model, field, this);

			if (isNil(field.featured)) return false;

			return field.featured;
		},
		// Get required prop of field
		fieldRequired(field) {
			if (isFunction(field.required)) return field.required.call(this, this.model, field, this);

			if (isNil(field.required)) return false;

			return field.required;
		},
		// Get visible prop of field
		fieldVisible(field) {
			if (isFunction(field.visible)) return field.visible.call(this, this.model, field, this);

			if (isNil(field.visible)) return true;

			return field.visible;
		},
		// onToggle event handler
		emitToggleCollapsed(field) {
			if (field.collapsible) {
				const state = !this.fieldCollapsed(field);

				if ( !isFunction(field.collapsed)) {
					field.collapsed = state;
				}
				this.$emit("toggle-collapsed", { field: field, collapsed: state });				
			}
		},		
	}
};
