// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DogCreated from './components/DogCreated.jsx';

import '@testing-library/jest-dom';

configure({ adapter: new Adapter() }); 

describe("<DogCreated />", () => {
    describe("Estructura", () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(<DogCreated />);
      });
      it("Renderiza un <form>", () => {
        expect(wrapper.find("form")).toHaveLength(1);
      });
  
      it('Renderiza un label con el texto igual a "Name:"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find("label").at(0).text()).toEqual("Name:");
      });
  
      it('Renderiza un input con la propiedad "name" igual a "name"', () => {
        expect(wrapper.find('input[name="name"]')).toHaveLength(1);
      });
  
      it('Renderiza un label con el texto igual a "Weight:"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find("label").at(1).text()).toEqual("Weight:");
      });
  
      it('Renderiza una input con la propiedad "name" igual a "weight"', () => {
        expect(wrapper.find('input[name="weight"]')).toHaveLength(1);
      });
  
      it('Renderiza un label con el texto igual a "Height:"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find("label").at(2).text()).toEqual("height:");
      });
  
      it('Renderiza un input con la propiedad "name" igual a "height"', () => {
        expect(wrapper.find('input[name="height"]')).toHaveLength(1);
      });
  
      it('Renderiza un label con el texto igual a "Life Span:"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find("label").at(3).text()).toEqual("Life Span:");
      });
  
      it('Renderiza un input con la propiedad "name" igual a "life_span"', () => {
        expect(wrapper.find('input[name="life_span"]')).toHaveLength(1);
      });
  
      it('Renderiza un boton con el "type" "submit"', () => {
        expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
      });

    });
});