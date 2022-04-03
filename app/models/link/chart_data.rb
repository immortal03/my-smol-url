module Link::ChartData
  def statistics_data
    # Return 4 types of statistics data for the link analytics page:
    # 1. # of clicks
    # 2. Top country of clicks
    # 3. Top browser of clicks
    # 4. Top device of clicks

    [].tap do |data|
      data << {
        name: "Total Clicks",
        value: clicks_count,
        description: "from #{created_at.strftime("%b %d, %Y")}"
      }

      # Get stats from top country
      top_country, tc_clicks = click_events.group(:country).count.max_by { |_, v| v }
      data << {
        name: "Top Country",
        value: top_country || "-",
        description: top_country ? "from #{tc_clicks} clicks" : nil
      }

      # Get stats from top device
      top_device, td_clicks = click_events.group(:device).count.max_by { |_, v| v }
      data << {
        name: "Top Device",
        value: top_device || "-",
        description: top_device ? "from #{td_clicks} clicks" : nil
      }

      # Get stats from top browser
      top_browser, tb_clicks = click_events.group(:browser).count.max_by { |_, v| v }
      data << {
        name: "Top Browser",
        value: top_browser || "-",
        description: top_browser ? "from #{tb_clicks} clicks" : nil
      }
    end
  end

  def visual_data
    # Data structure for Charts.js
    # https://react-chartjs-2.js.org/components
    # https://www.chartjs.org/docs/latest/
    # Color palette - https://learnui.design/tools/data-color-picker.html#palette
    bar_chart_color = "#5383a1"
    color_palette = %w[
      #003f5c
      #2f4b7c
      #665191
      #a05195
      #d45087
      #f95d6a
      #ff7c43
      #ffa600
    ]

    {}.tap do |data|
      # Link clicks bar chart - display last 30 days
      clicks_labels, clicks_data = chart_clicks_by_days.values_at(:labels, :data)

      data[:link_clicks] = {
        name: "Clicks",
        labels: clicks_labels,
        datasets: [
          {
            label: "Clicks",
            data: clicks_data,
            background_color: bar_chart_color
          }
        ]
      }

      # Clicks by country pie chart
      grouped_clicks_by_country = click_events.group(:country).count
      country_labels, country_data = chart_meta_clicks_by_limit(grouped_clicks_by_country).values_at(:labels, :data)

      data[:clicks_by_country] = {
        name: "Clicks by Country",
        labels: country_labels,
        datasets: [
          {
            data: country_data,
            background_color: color_palette,
            border_width: 1
          }
        ]
      }

      # Clicks by devices pie chart
      grouped_clicks_by_device = click_events.group(:device).count
      device_labels, device_data = chart_meta_clicks_by_limit(grouped_clicks_by_device).values_at(:labels, :data)

      data[:clicks_by_device] = {
        name: "Clicks by Device",
        labels: device_labels,
        datasets: [
          {
            data: device_data,
            background_color: color_palette,
            border_width: 1
          }
        ]
      }

      # Clicks by browser pie chart
      grouped_clicks_by_browser = click_events.group(:browser).count
      browser_labels, browser_data = chart_meta_clicks_by_limit(grouped_clicks_by_browser).values_at(:labels, :data)

      data[:clicks_by_browser] = {
        name: "Clicks by Browser",
        labels: browser_labels,
        datasets: [
          {
            data: browser_data,
            background_color: color_palette,
            border_width: 1
          }
        ]
      }
    end
  end

  # Returns a hash of labels and values for the clicks by days
  # days: number of days to look back
  def chart_clicks_by_days(days: 30)
    return {} if days.blank?

    from_date = (days.days.ago + 1.day).to_date
    to_date = Time.zone.today

    labels_array = (from_date..to_date).to_a.map { |date| date.strftime("%b %d") }

    grouped_clicks_by_date = click_events.where(
      event_at: from_date.beginning_of_day..to_date.end_of_day
    ).group("DATE(event_at AT TIME ZONE 'UTC+8')").count

    data_array = (from_date..to_date).to_a.map { |date| grouped_clicks_by_date[date] || 0 }

    {labels: labels_array, data: data_array}
  end

  # Returns a hash of labels and values for clicks based on metadata (countries, devices & browsers)
  # Includes a hash arg which will take in a hash of the grouped click_events
  # Includes a length arg which limits number of single items returned. Items will be sorted by highest value.
  # Items that exceed the length limit will be sum up into an "Others" category
  def chart_meta_clicks_by_limit(hash, length: 7)
    return {} if hash.blank?

    length = 7 if length > 7 # Limit to 7 items + "Others" as color palette defined for 8 items only
    hash = hash.sort_by { |_k, v| v }.reverse.to_h

    labels = []
    labels << hash.keys.first(length)
    labels << "Others" if hash.keys.length > length

    values = []
    values << hash.values.first(length)
    values << hash.values[length..-1].sum if hash.keys.length > length

    {labels: labels.flatten, data: values.flatten}
  end
end
