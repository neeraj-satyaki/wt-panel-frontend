type IconArrowProps = {
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function IconArrow({ className, direction }: IconArrowProps) {
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'rotate(-90deg)'
      case 'down':
        return 'rotate(90deg)'
      case 'left':
        return 'rotate(180deg)'
      case 'right':
        return 'rotate(360deg)'
      default:
        return ''
    }
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      style={{ transform: getTransform() }} // Применяем поворот в зависимости от direction
    >
      <path
        d="M0 7C0 6.73428 0.0965773 6.47944 0.268486 6.29155C0.440394 6.10365 0.673552 5.9981 0.916667 5.9981H18.8705L14.9362 1.69793C14.7692 1.50897 14.6768 1.25589 14.6789 0.993195C14.681 0.730499 14.7774 0.479209 14.9473 0.293448C15.1173 0.107688 15.3472 0.00231934 15.5875 3.71933e-05C15.8279 -0.0022459 16.0594 0.0987406 16.2323 0.281245L21.7323 6.29266C21.8172 6.38483 21.8845 6.49442 21.9304 6.61512C21.9763 6.73582 22 6.86526 22 6.99599V7C22 7.13025 21.9762 7.26049 21.9285 7.38273C21.8828 7.50419 21.8155 7.61453 21.7305 7.70734L16.2305 13.7188C16.0576 13.9013 15.8261 14.0022 15.5857 14C15.3454 13.9977 15.1155 13.8923 14.9455 13.7065C14.7755 13.5208 14.6791 13.2695 14.677 13.0068C14.675 12.7441 14.7674 12.491 14.9343 12.3021L18.8705 8.0019H0.916667C0.673552 8.0019 0.440394 7.89634 0.268486 7.70845C0.0965773 7.52056 0 7.26572 0 7Z"
        fill="currentColor"
      />
    </svg>
  )
}
