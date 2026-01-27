import { BaseElement } from "../Elements/BaseElement";

export class HW21Elements{
    #baseElement = new BaseElement();
    get addCarBtn(){
        return this.#baseElement.getElement('.btn.btn-primary').contains('Add car')
    }
    get mileageTextBox(){
        return this.#baseElement.getElement('#addCarMileage')
    }
    get btnAddInPopup(){
        return this.#baseElement.getElement('.btn.btn-primary').contains('Add')
    }
    get addFuelExpenseBtn(){
        return this.#baseElement.getElement('.car_add-expense.btn.btn-success').contains('Add fuel expense')
    }
    get numberOfLitersTextBox(){
        return this.#baseElement.getElement('#addExpenseLiters')
    }
    get totalCostTextBox(){
        return this.#baseElement.getElement('#addExpenseTotalCost')
    }
    get addButtonInExpensePopup(){
        return this.#baseElement.getElement('.btn.btn-primary').contains('Add')
    }
    get addExpenseMileage(){
        return this.#baseElement.getElement('#addExpenseMileage')
    }
    get addCarBrand(){
        return this.#baseElement.getElement('#addCarBrand')
    }
    get addCarModel(){
        return this.#baseElement.getElement('#addCarModel')
    }
}