import { Chip } from "./chip";
import { isObject, isFunction } from "../../share/src";

export interface OptionComponent {
  install: (props?: object, context?: ComponentInstance) => object
}

export interface ClassComponent {
  
}

export interface FunctionComponent {
  
}

export type Component = OptionComponent | ClassComponent | FunctionComponent

export interface ComponentInstance {
  chip: Chip | null
  Component: Component
  dataSource: object
  refs: object[] | null
  [key: string]: any
}

export default class NukerComponent {
  constructor(props: unknown[]) {
    this.props = props
  }

  protected props?: unknown[]
}

export function isClassComponent(Component: Component): Component is ClassComponent {
  return false
}

export function createComponentInstance(Component: Component, chipContainer: Chip): ComponentInstance {
  let instance: ComponentInstance
  if (isObject(Component)) {
    // option component
    const install = (Component as OptionComponent).install
    if (isFunction(install)) {
      instance = Object.create(null)
      instance.refs = null
      // 挂载组件数据源
      instance.dataSource = install()
    }
  } else if (isFunction(Component)) {
    // function component
    const renderFn = (Component as Function)()
    instance = Object.create(null)
    instance.render = renderFn
  } else if (isClassComponent(Component)) {
    // class component
    instance = new Component()
  } else {
    // invalid component
  }

  instance.Component = Component
  instance.chip = chipContainer

  return instance
}

export function reuseComponentInstance(instance: ComponentInstance, chipContainer: Chip): ComponentInstance {

}