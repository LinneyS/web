import debounce from 'lodash-es/debounce'

export default (
  wait: number,
  options?: {
    leading?: boolean
    maxWait?: number
    trailing?: boolean
  }
) => {
  return function(target: unknown, key: string, descriptor: PropertyDescriptor): void {
    const fn = descriptor.value
    const bouncer = debounce(
      function(
        executor: { resolve: (value: any) => void; reject: (reason: any) => void },
        ...args: any[]
      ) {
        try {
          executor.resolve(fn.apply(this, args))
        } catch (error) {
          executor.reject(error)
        }
      },
      wait,
      options
    )

    descriptor.value = function(...args: any[]) {
      return new Promise((resolve, reject) => {
        bouncer.apply(this, [{ resolve, reject }, ...args])
      })
    }
  }
}
