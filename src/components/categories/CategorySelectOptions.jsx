import React from "react";



class CategoriesSelectOptions extends React.PureComponent {
    constructor(props) {
        super(props);

    }
    render() {
        const {category}=this.props;

 // const category=this.props.category;

        return(
            <option value={category.id}>
                {category.name}
            </option>

        )

    }
}
export default CategoriesSelectOptions;