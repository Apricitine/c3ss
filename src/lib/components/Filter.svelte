<script lang="ts">
    let isDroppedDown = false
    const handleDropDownClick = () => {
        isDroppedDown = !isDroppedDown //toggle dropdown
    }

    const handleDropdownFocusLoss = (event: FocusEvent): void => {
        const { relatedTarget, currentTarget } = event;
        if (
            relatedTarget instanceof HTMLElement &&
            currentTarget instanceof HTMLElement &&
            currentTarget.contains(relatedTarget)
        ) { return }
        isDroppedDown = false;
    };




</script>

