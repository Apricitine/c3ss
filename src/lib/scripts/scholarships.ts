const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

export type EndowmentRange = [number, number | "full-tuition"]

export type Endowment = {
  place: number
  amount: number | EndowmentRange
}

export type ScholarshipDTO = {
  id: number
  name: string
  created: string
  description: string
  deadline: string
  primary_link: string
  filters: { filters: string[] } | null
  availableGrades: number[]
  endowment: Endowment[]
}

export class Scholarship implements ScholarshipDTO {
  id: number
  name: string
  created: string
  description: string
  deadline: string
  primary_link: string
  filters: { filters: string[] } | null
  availableGrades: number[]
  endowment: Endowment[]

  constructor(dto: ScholarshipDTO) {
    this.id = dto.id
    this.name = dto.name
    this.created = dto.created
    this.description = dto.description
    this.deadline = dto.deadline
    this.primary_link = dto.primary_link
    this.filters = dto.filters ?? null
    this.availableGrades = dto.availableGrades
    this.endowment = dto.endowment ?? []
  }

  static from(dto: ScholarshipDTO) {
    return new Scholarship(dto)
  }

  get deadlineDate() {
    return new Date(this.deadline)
  }

  formattedDeadline() {
    const date = this.deadlineDate
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  daysUntil(reference: Date = new Date()) {
    const msPerDay = 1000 * 60 * 60 * 24
    const today = new Date(reference)
    today.setHours(0, 0, 0, 0)

    const target = new Date(this.deadline)
    target.setHours(0, 0, 0, 0)

    return Math.ceil((target.getTime() - today.getTime()) / msPerDay)
  }

  countdownClass(reference?: Date) {
    const days = this.daysUntil(reference)
    if (days < 0) return "passed" as const
    if (days <= 3) return "hot" as const
    if (days <= 10) return "warm" as const
    return "calm" as const
  }

  countdownLabel(reference?: Date, { short = false } = {}) {
    const days = this.daysUntil(reference)
    if (days < 0) return "Passed"
    if (short) return `${days}d`
    return `${days} days`
  }

  endowmentRange() {
    let lowest = Number.POSITIVE_INFINITY
    let highest: number | "full-tuition" = Number.NEGATIVE_INFINITY

    if (!this.endowment || this.endowment.length === 0) return null

    for (const prize of this.endowment) {
      const [min, max] = Array.isArray(prize.amount)
        ? prize.amount
        : [prize.amount, prize.amount]

      lowest = Math.min(lowest, min)
      highest = (highest === "full-tuition") ? 
        "full-tuition" : (
          (max === "full-tuition") ? "full-tuition" : Math.max(highest, max)
        )
    }

    if (!Number.isFinite(lowest)) {
      return null
    }

    const range: [number, number | "full-tuition"] = [lowest, highest]

    if (!range) return null
    const [low, high] = range
    return low === high
      ? formatCurrency(low)
      : `${formatCurrency(low)} – ${(high === "full-tuition") ? "Full Tuition" : formatCurrency(high)}`
  }

  toJSON(): ScholarshipDTO {
    return {
      id: this.id,
      name: this.name,
      created: this.created,
      description: this.description,
      deadline: this.deadline,
      primary_link: this.primary_link,
      filters: this.filters,
      availableGrades: this.availableGrades,
      endowment: this.endowment
    }
  }
}
