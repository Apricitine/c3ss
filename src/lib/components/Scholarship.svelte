<script lang="ts">
  interface Props {
    name: string
    deadline: string
    description: string
    showing: boolean
  }

  let props: Props = $props()
</script>

<section onclick={() => (props.showing = true)}>
  <div id="name">{props.name}</div>
  <div id="deadline">{props.deadline}</div>
  <div id="description">{props.description}</div>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: row;
    padding: 1%;
    width: 100%;
    align-items: center;

    font-family: Lato;
    
    #name {
      flex: 0 0 22.5%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 900;
      font-size: 1.1rem;
      color: rgb(34, 140, 233);
    }

    #deadline {
      flex: 0 0 7%;
    }

    #description {
      flex: 0 0 73%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
