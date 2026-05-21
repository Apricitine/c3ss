const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

export type EstCostRange = [number, number | "free"]

export type EstCost = {
  place: number
  amount: number | EstCostRange
}

export const FILTER_COLORS = {
  cyan: "#52cfeb",
  red: "#eb5752",
  green: "#65ba6a",
  yellow: "#debe68",
  blue: "#5276eb",
  orange: "#eb8552",
  purple: "#b882e0",
  gold: "#e3ab62",
} as const

export type FilterColor = keyof typeof FILTER_COLORS

export type FilterDefinition = {
  name: string
  description: string
  color: FilterColor
}

const filterDefinitions = {
  science: {
    name: "Science",
    description: "The summer program has some relevancy to science.",
    color: "green",
  },
  ethnic: {
    name: "Ethnic",
    description: "The summer program is intended for a specific ethnic community.",
    color: "purple",
  },
  needbased: {
    name: "Need-Based",
    description: "The summer program considers financial need.",
    color: "gold",
  },
//   experienceincluded: {
//     name: "Experience Included",
//     description: "The summer program offers an additional experience on top of the financial estCost.",
//     color: "red",
//   },
  literaryarts: {
    name: "Literary Arts",
    description: "The summer program has some relevancy to the literary arts.",
    color: "orange",
  },
  advocacy: {
    name: "Advocacy",
    description: "The summer program has some relevancy to political or social activism.",
    color: "orange",
  },
  meritonly: {
    name: "Merit Only",
    description: "The summer program only considers merit in applicants.",
    color: "gold",
  },
//   majorspecific: {
//     name: "Major-Specific",
//     description: "The summer program only accepts applicants pursuing a specific major in college/other program.",
//     color: "cyan",
//   },
} as const satisfies Record<string, FilterDefinition>

export type SummerFilterKey = keyof typeof filterDefinitions

export type SummerFilter = FilterDefinition & {
  key: SummerFilterKey
}

export type SummerDTO = {
  id: number
  name: string
  created: string
  description: string
  deadline: string
  primary_link: string
  filters?: SummerFilterKey[] | null
  availableGrades: number[]
  estCost: EstCost[]
}

export class Summer implements SummerDTO {
  id: number
  name: string
  created: string
  description: string
  deadline: string
  primary_link: string
  filters: SummerFilterKey[]
  availableGrades: number[]
  estCost: EstCost[]

  constructor(dto: SummerDTO) {
    this.id = dto.id
    this.name = dto.name
    this.created = dto.created
    this.description = dto.description
    this.deadline = dto.deadline
    this.primary_link = dto.primary_link
    this.filters = dto.filters ?? []
    this.availableGrades = dto.availableGrades
    this.estCost = dto.estCost ?? []
  }

  static from(dto: SummerDTO) {
    return new Summer(dto)
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

  estCostRange() {
    let lowest = Number.POSITIVE_INFINITY
    let highest: number | "free" = Number.NEGATIVE_INFINITY

    if (!this.estCost || this.estCost.length === 0) return null

    for (const prize of this.estCost) {
      const [min, max] = Array.isArray(prize.amount)
        ? prize.amount
        : [prize.amount, prize.amount]

      lowest = Math.min(lowest, min)
      highest =
        highest === "free"
          ? "free"
          : max === "free"
            ? "free"
            : Math.max(highest, max)
    }

    if (!Number.isFinite(lowest) || (highest !== "free" && !Number.isFinite(highest))) {
      return null
    }

    return lowest === highest
      ? formatCurrency(lowest)
      : `${formatCurrency(lowest)} – ${highest === "free" ? "free" : formatCurrency(highest)}`
  }

  displayFilters(): SummerFilter[] {
    return this.filters.flatMap((key) => {
      const definition = filterDefinitions[key]
      return definition ? [{ key, ...definition }] : []
    })
  }

  toJSON(): SummerDTO {
    return {
      id: this.id,
      name: this.name,
      created: this.created,
      description: this.description,
      deadline: this.deadline,
      primary_link: this.primary_link,
      filters: this.filters,
      availableGrades: this.availableGrades,
      estCost: this.estCost,
    }
  }
}
